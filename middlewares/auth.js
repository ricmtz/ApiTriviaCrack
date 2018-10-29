const bcrypt = require('bcrypt');
const { UsersORM, TokensORM } = require('../orm');


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
    }

    async register(req, res, next) {
        let user = null;
        let token = null;
        req.body.password = await this.hash(req.body.password)
            .catch(err => next(err));
        if (!req.body.password) {
            return;
        }
        user = await UsersORM.create(req.body)
            .catch(err => next(err));
        if (!user) {
            return;
        }
        token = await this.createToken(user)
            .catch(err => next(err));
        if (!token) {
            return;
        }
        res.send({
            data: user,
            token: token.getToken(),
        }).status(201);
        next();
    }

    async hashString(str) {
        const hashS = await bcrypt.hash(str, Number(process.env.SALT_ROUNDS))
            .catch(err => Promise.reject(err));
        return hashS;
    }

    secureString(str) {
        return `${str}${process.env.SECRET}`;
    }

    async hash(str) {
        const hash = await this.hashString(this.secureString(str))
            .catch(err => Promise.reject(err));
        return hash;
    }

    async genTokenData(user) {
        const hashToken = await this.hash(user.getNickname())
            .catch(err => Promise.reject(err));
        const currDate = new Date();
        const expireDate = new Date(currDate);
        expireDate.setHours(expireDate.getHours() + Number(process.env.SESSION_TIME));
        return {
            token: hashToken,
            createdat: currDate.toISOString(),
            expires: expireDate.toISOString(),
            type: 's',
            status: '1',
            userid: user.getId(),
        };
    }

    async createToken(user) {
        const tokenData = await this.genTokenData(user)
            .catch(err => Promise.reject(err));
        const resToken = await TokensORM.create(tokenData)
            .catch(err => Promise.reject(err));
        return resToken;
    }

    async login(req, res, next) {
        // Check if user exists
        req.body.user = await UsersORM.getByNickname(req.body.nickname)
            .catch(err => next(err));
        if (!req.body.user) {
            return;
        }
        // Check user password
        const correctPass = await bcrypt.compare(this.secureString(req.body.password),
            req.body.user.password).catch(err => next(err));
        // Finish if compare() failed
        if (typeof (correctPass) === 'undefined') {
            return;
        }
        // Check if password is correct
        if (correctPass === false) {
            next(new Error('User/password combination is not valid'));
            return;
        }
        // Check last active token associated to the user
        const tokenObj = await TokensORM.getLastByUserId(req.body.user.getId())
            .catch(err => next(err));
        if (!tokenObj) {
            return;
        }
        // Check if te token is still active
        if (tokenObj.isActive()) {
            res.send({ token: tokenObj.getToken() }).status(200);
            next();
            return;
        }
        // Set the token status to 0
        const updated = await TokensORM.updateStatus(tokenObj.getId(), '0')
            .catch(err => next(err));
        if (!updated) {
            return;
        }
        // Generate new token
        const token = await this.createToken(req.body.user)
            .catch(err => next(err));
        if (!token) {
            return;
        }
        res.send({ token: token.getToken() }).status(201);
        next();
    }

    async logout(req, res, next) {
        const tokenObj = await TokensORM.get(req.get('token'))
            .catch(err => next(err));
        if (!tokenObj) {
            return;
        }
        const updated = await TokensORM.updateStatus(tokenObj.getId(), '0')
            .catch(err => next(err));
        if (!updated) {
            return;
        }
        res.send().status(204);
        next();
    }

    async session(req, res, next) {
        if (!req.get('token')) {
            next(new Error('Missing token'));
            return;
        }
        const tokenObj = await TokensORM.get(req.get('token'))
            .catch(err => next(new Error('Not valid token')));
        if (!tokenObj) {
            return;
        }
        if (!tokenObj.isActive()) {
            const updated = await TokensORM.updateStatus(tokenObj.getId(), '0')
                .catch(err => next(err));
            if (!updated) {
                return;
            }
            next(new Error('The session has expired'));
            return;
        }
        next();
    }
}


module.exports = new Auth();
