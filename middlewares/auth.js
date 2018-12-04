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
        try {
            // Encrypt password
            req.body.password = await this.hash(req.body.password);
            // Create user
            const user = await UsersORM.create(req.body);
            // Create new session token
            const sessToken = await this.createSessionToken(user);
            // Create verification token
            this.createVerificationToken(user);
            res.send({ data: user, token: sessToken.getToken() }).status(201);
            return next();
        } catch (e) {
            return next(e);
        }
    }

    async createSessionToken(user) {
        try {
            return await this.createToken(user, 's');
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async createVerificationToken(user) {
        try {
            const token = await this.createToken(user, 'v');
            await mailer.sendVerification(user.getEmail(), token.getToken());
            return token;
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async hash(str) {
        try {
            return await this.hashString(this.secureString(str));
        } catch (e) {
            return Promise.reject(e);
        }
    }

    secureString(str) {
        return `${str}${process.env.SECRET}`;
    }

    async hashString(str) {
        try {
            return await bcrypt.hash(str, Number(process.env.SALT_ROUNDS));
        } catch (e) {
            return Promise.reject(Codes.resServerErr(e.message));
        }
    }

    async login(req, res, next) {
        try {
            // Check if user exists
            const user = await UsersORM.getByNickname(req.body.nickname);
            // Check user password
            const correctPass = await bcrypt.compare(this.secureString(req.body.password),
                user.getPassword());
            // Check if password is correct
            if (correctPass === false) {
                return next(Codes.resUnauthorized('User/password combination is not valid'));
            }
            // Get last active token associated to the user
            const tokenObj = await TokensORM.getLastByUserId(user.getId());
            // Update session
            await this.updateSession(tokenObj);
            // Check if te token is still active
            if (tokenObj.isActive()) {
                res.send({ token: tokenObj.getToken() }).status(200);
                return next();
            }
            // Generate new session token
            const sessToken = await this.createSessionToken(user);
            res.send({ token: sessToken.getToken() }).status(201);
            return next();
        } catch (e) {
            return next(e);
        }
    }

    async createToken(user, type = 's') {
        try {
            const tokenData = await this.genTokenData(user, type);
            const resToken = await TokensORM.create(tokenData);
            return resToken;
        } catch (e) {
            return Promise.reject(e);
        }
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
        try {
            if (!req.get('token')) {
                return next(Codes.resUnauthorized('Missing token'));
            }
            const token = await TokensORM.get(req.get('token'));
            await TokensORM.updateStatus(token.getId(), '0');
            res.send().status(204);
            return next();
        } catch (e) {
            return next(e);
        }
    }

    async session(req, res, next) {
        try {
            if (!req.get('token')) {
                return next(Codes.resUnauthorized('Missing token'));
            }
            const token = await TokensORM.get(req.get('token'));
            await this.updateSession(token);
            if (!token.isActive()) {
                return next(Codes.resUnauthorized('The session has expired'));
            }
            return next();
        } catch (e) {
            return next(e);
        }
    }

    async updateSession(token) {
        try {
            if (!token.isActive()) {
                token.setStatus('0');
                await TokensORM.updateStatus(token.getId(), '0');
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async restore(req, res, next) {
        try {
            if (!req.query.token) {
                await this.restoreToken(req, res, next);
            } else {
                await this.restorePass(req, res, next);
            }
            return next();
        } catch (e) {
            return next(e);
        }
    }

    async restoreToken(req, res, next) {
        try {
            if (!req.body.nickname) {
                return next(Codes.resBadRequest('Missing user nickname'));
            }
            const user = await UsersORM.getByNickname(req.body.nickname);
            const resToken = await this.createRestorationToken(user);
            res.send({ token: resToken.getToken() }).status(201);
            return next();
        } catch (e) {
            return next(e);
        }
    }

    async createRestorationToken(user) {
        try {
            const token = await this.createToken(user, 'r');
            await mailer.sendRestoration(user.getEmail(), token.getToken());
            return token;
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async restorePass(req, res, next) {
        try {
            if (!req.body.password) {
                return next(Codes.resBadRequest('Missing user password'));
            }
            const token = await TokensORM.get(req.query.token, 'r');
            await this.updateSession(token);
            if (!token.isActive()) {
                return next(Codes.resUnauthorized('The token has expired'));
            }
            const user = await UsersORM.get(token.getUserId());
            const hashedPass = await this.hash(req.body.password);
            await UsersORM.update(user.getNickname(), { password: hashedPass });
            await TokensORM.updateStatus(token.getId(), '0');
            res.status(204).send();
            return next();
        } catch (e) {
            return next(e);
        }
    }

    async verify(req, res, next) {
        try {
            if (req.query.token) {
                const token = await TokensORM.get(req.query.token, 'v');
                const user = await UsersORM.get(token.getUserId());
                await UsersORM.update(user.getNickname(), { verified: true });
                await TokensORM.updateStatus(token.getId(), '0');
            } else {
                return next(Codes.resUnauthorized('Missing token'));
            }
            res.send().status(204);
            return next();
        } catch (e) {
            return next(e);
        }
    }

    async havePermissions(req, res, next) {
        try {
            const tokenObj = await TokensORM.get(req.get('token'));
            const user = await UsersORM.get(tokenObj.getUserId());
            let rol = 'user';
            if (user.getAdmin()) {
                rol = 'admin';
            }
            if (Authorization.canDo(rol, user.getNickname(), req)) {
                return next();
            }
            return next(Codes.resUnauthorized('Dont have Authorization'));
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = new Auth();
