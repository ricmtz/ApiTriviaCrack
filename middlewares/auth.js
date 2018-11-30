const bcrypt = require('bcryptjs');
const { UsersORM, TokensORM } = require('../orm');
const Authorization = require('../orm/authorizations');
const { mailer } = require('../mail');
const { Codes } = require('../resCodes');


class Auth {
    constructor() {
        this.register = this.register.bind(this);
        this.hashString = this.hashString.bind(this);
        this.hash = this.hash.bind(this);
        this.genTokenData = this.genTokenData.bind(this);
        this.createToken = this.createToken.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.session = this.session.bind(this);
        this.restore = this.restore.bind(this);
        this.verify = this.verify.bind(this);
    }

    async register(req, res, next) {
        // Encrypt password
        req.body.password = await this.hash(req.body.password)
            .catch(err => next(err));
        if (!req.body.password) {
            return;
        }
        // Create user
        const user = await UsersORM.create(req.body)
            .catch(err => next(err));
        if (!user) {
            return;
        }
        // Create session token
        const sessToken = await this.createSessionToken(user)
            .catch(err => next(err));
        if (!sessToken) {
            return;
        }
        // Create verification token
        const verToken = this.createVerificationToken(user)
            .catch(err => next(err));
        if (!verToken) {
            return;
        }
        res.send({
            data: user,
            token: sessToken.getToken(),
        }).status(201);
        next();
    }

    async createSessionToken(user) {
        const token = await this.createToken(user, 's')
            .catch(err => Promise.reject(err));
        return token;
    }

    async createVerificationToken(user) {
        const token = await this.createToken(user, 'v')
            .catch(err => Promise.reject(err));
        mailer.sendVerification(user.getEmail(), token.getToken());
        return token;
    }

    async hash(str) {
        const hashedStr = await this.hashString(this.secureString(str))
            .catch(err => Promise.reject(err));
        return hashedStr;
    }

    secureString(str) {
        return `${str}${process.env.SECRET}`;
    }

    async hashString(str) {
        const hashedStr = await bcrypt.hash(str, Number(process.env.SALT_ROUNDS))
            .catch(err => Promise.reject(Codes.resServerErr(err.message)));
        return hashedStr;
    }

    async login(req, res, next) {
        // Check if user exists
        const user = await UsersORM.getByNickname(req.body.nickname)
            .catch(err => next(err));
        if (!user) {
            return;
        }
        // Check user password
        const correctPass = await bcrypt.compare(this.secureString(req.body.password),
            user.getPassword())
            .catch(err => next(err));
        // Finish if compare() failed
        if (typeof (correctPass) === 'undefined') {
            return;
        }
        // Check if password is correct
        if (correctPass === false) {
            next(Codes.resUnauthorized('User/password combination is not valid'));
            return;
        }
        // Get last active token associated to the user
        const tokenObj = await TokensORM.getLastByUserId(user.getId())
            .catch(err => next(err));
        if (!tokenObj) {
            return;
        }
        // Check if te token is still active
        await this.updateSession(tokenObj)
            .catch(err => next(err));

        if (tokenObj.isActive()) {
            res.send({ token: tokenObj.getToken() }).status(200);
            next();
            return;
        }
        // Generate new session token
        const sessToken = await this.createSessionToken(user)
            .catch(err => next(err));
        if (!sessToken) {
            return;
        }
        res.send({ token: sessToken.getToken() }).status(201);
        next();
    }

    async createToken(user, type = 's') {
        const tokenData = await this.genTokenData(user, type)
            .catch(err => Promise.reject(err));
        const resToken = await TokensORM.create(tokenData)
            .catch(err => Promise.reject(err));
        return resToken;
    }

    async genTokenData(user, tokenType = 's') {
        const currentDate = new Date();
        const expireDate = new Date(currentDate);

        switch (tokenType) {
        case 's':
            expireDate.setHours(expireDate.getHours() + Number(process.env.SESSION_TIME));
            break;
        case 'r':
            expireDate.setMinutes(expireDate.getMinutes() + Number(process.env.RESTORE_TIME));
            break;
        case 'v':
            expireDate.setHours(expireDate.getHours() + Number(process.env.VERIFICATION_TIME));
            break;
        default:
            return Promise.reject(Codes.resServerErr('Invalid token type'));
        }

        const hashToken = await this.hash(user.getNickname())
            .catch(err => Promise.reject(err));

        return {
            token: hashToken,
            createdat: currentDate.toISOString(),
            expires: expireDate.toISOString(),
            type: tokenType,
            status: '1',
            userid: user.getId(),
        };
    }

    async logout(req, res, next) {
        if (!req.get('token')) {
            next(Codes.resUnauthorized('Missing token'));
            return;
        }
        const token = await TokensORM.get(req.get('token'))
            .catch(() => next(Codes.resNotFound('Invalid token')));
        if (!token) {
            return;
        }
        const updated = await TokensORM.updateStatus(token.getId(), '0')
            .catch(err => next(err));
        if (!updated) {
            return;
        }
        res.send().status(204);
        next();
    }

    async session(req, res, next) {
        if (!req.get('token')) {
            next(Codes.resUnauthorized('Missing token'));
            return;
        }
        const token = await TokensORM.get(req.get('token'))
            .catch(err => next(Codes.resNotFound(err.message)));
        if (!token) {
            return;
        }
        await this.updateSession(token)
            .catch(err => next(err));
        if (!token.isActive()) {
            next(Codes.resUnauthorized('The session has expired'));
            return;
        }
        next();
    }

    async updateSession(token) {
        if (!token.isActive()) {
            token.setStatus('0');
            await TokensORM.updateStatus(token.getId(), '0')
                .catch(err => Promise.reject(err));
        }
    }

    async restore(req, res, next) {
        if (!req.query.token) {
            await this.restoreToken(req, res, next);
        } else {
            await this.restorePass(req, res, next);
        }
    }

    async restoreToken(req, res, next) {
        if (!req.body.nickname) {
            next(Codes.resBadRequest('Missing user nickname'));
            return;
        }
        const user = await UsersORM.getByNickname(req.body.nickname)
            .catch(err => next(Codes.resNotFound(err.message)));
        if (!user) {
            return;
        }
        const resToken = await this.createRestorationToken(user)
            .catch(err => next(err));
        if (!resToken) {
            return;
        }
        res.send({
            token: resToken.getToken(),
        }).status(201);
    }

    async createRestorationToken(user) {
        const token = await this.createToken(user, 'r')
            .catch(err => Promise.reject(err));
        mailer.sendRestoration(user.getEmail(), token.getToken());
        return token;
    }

    async restorePass(req, res, next) {
        if (!req.body.password) {
            next(Codes.resBadRequest('Missing user password'));
            return;
        }
        const token = await TokensORM.get(req.query.token, 'r')
            .catch(() => next(Codes.resUnauthorized('Invalid token')));
        if (!token) {
            return;
        }
        await this.updateSession(token)
            .catch(err => next(err));
        if (!token.isActive()) {
            next(Codes.resUnauthorized('The token has expired'));
            return;
        }
        const user = await UsersORM.get(token.getUserId())
            .catch(err => next(err));
        if (!user) {
            return;
        }
        const hashedPass = await this.hash(req.body.password)
            .catch(err => next(err));
        if (!hashedPass) {
            return;
        }
        await UsersORM.update(user.getNickname(), { password: hashedPass })
            .catch(err => next(err));
        await TokensORM.updateStatus(token.getId(), '0')
            .catch(err => next(err));
        res.status(204).send();
    }

    async verify(req, res, next) {
        if (req.query.token) {
            const token = await TokensORM.get(req.query.token, 'v')
                .catch(() => next(Codes.resUnauthorized('Invalid token')));
            if (!token) {
                return;
            }
            const user = await UsersORM.get(token.getUserId())
                .catch(err => next(err));
            if (!user) {
                return;
            }
            await UsersORM.update(user.getNickname(), { verified: true })
                .catch(err => next(err));
            await TokensORM.updateStatus(token.getId(), '0')
                .catch(err => next(err));
        } else {
            next(Codes.resUnauthorized('Missing token'));
        }
        res.send().status(204);
        next();
    }

    async havePermissions(req, res, next) {
        const tokenObj = await TokensORM.get(req.get('token'))
            .catch(() => next(Codes.resUnauthorized('Not valid token')));
        if (!tokenObj) {
            return;
        }
        const user = await UsersORM.get(tokenObj.getUserId())
            .catch(err => next(err));
        let rol = 'user';
        if (user.getAdmin()) {
            rol = 'admin';
        }
        if (Authorization.canDo(rol, user.getNickname(), req)) {
            next();
        } else {
            next(Codes.resUnauthorized('Dont have Authorization'));
        }
    }
}

module.exports = new Auth();
