const bcrypt = require('bcrypt');
const { UsersORM, TokensORM } = require('../orm');


class Auth {
    constructor() {
        this.register = this.register.bind(this);
        this.hashString = this.hashString.bind(this);
        this.genHash = this.genHash.bind(this);
        this.genTokenData = this.genTokenData.bind(this);
        this.createToken = this.createToken.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.session = this.session.bind(this);
    }

    async register(req, res, next) {
        let user = null;
        let token = null;

        await UsersORM.create(req.body)
            .then((usr) => { user = usr; })
            .catch(err => next(err));

        if (!user) {
            return;
        }

        await this.createToken(user)
            .then((tok) => { token = tok; })
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

    async genHash(user) {
        const hash = await this.hashString(`${user.getNickname()}${(new Date()).getTime()}`)
            .catch(err => Promise.reject(err));
        return hash;
    }

    async genTokenData(user) {
        const currDate = new Date();
        const expireDate = new Date(currDate);
        expireDate.setHours(expireDate.getHours() + process.env.SESSION_TIME);

        const hashToken = await this.genHash(user).catch(err => Promise.reject(err));

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
        const user = await UsersORM.login(req.body);
        if (typeof (user) !== typeof (User)) next(user);

        let token = await TokensORM.get(req.body.token);
        if (typeof (token) !== typeof (Token)) next(token);

        if (!token.getToken()) token = this.createToken(user);

        res.send({ data: { token: token.getToken() } }).status(201);
    }

    async logout(req, res, next) {
        if (!req.body.token) next('Token missing');
        await TokensORM.delete(req.body.token);
        res.send().status(204);
        next();
    }

    async session(res, req, next) {
        if (!req.body.token) next({ data: 'Token missing' });
        const token = await TokensORM.get(req.body.token);
        if (typeof (token) !== typeof (Token)) next(token);

        if (TokensORM.active(token.getToken())) next();
        else next({ data: 'The session has expired' });
        next();
    }
}


module.exports = new Auth();
