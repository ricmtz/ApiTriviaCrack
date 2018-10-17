const bcrypt = require('bcrypt');
const { UsersORM, TokensORM } = require('../orm');


class Auth {
    constructor() {
        this.createToken = this.createToken.bind(this);
    }

    async register(req, res, next) {
        const user = await UsersORM.create(req.body);
        if (typeof (user) !== typeof (User)) next(user);

        const token = await this.createToken(user);
        if (typeof (token) !== typeof (Token)) next(token);

        res.send({ data: { token: token.getToken() } }).status(201);
        next();
    }

    async createToken(user) {
        let res = null;

        const currDate = new Date();
        const expireDate = new Date(currDate);
        expireDate.setHours(expireDate.getHours() + process.env.SESSION_TIME);

        bcrypt.hash(`${user.getNickname()}${process.env.SECRET}`, process.env.SALT_ROUNDS, async (err, hash) => {
            if (err) {
                res = err;
                return;
            }

            res = await TokensORM.create({
                token: hash,
                createdat: currDate.getTime(),
                expiresat: expireDate.getTime(),
                type: 's',
                status: '1',
                userid: user.getId(),
            });
        });
        return res;
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
        console.log(req.body)
        if (!req.body.token) next({ data: 'Token missing' });
        const token = await TokensORM.get(req.body.token);
        if (typeof (token) !== typeof (Token)) next(token);

        if (TokensORM.active(token.getToken())) next();
        else next({ data: 'The session has expired' });
        next
    }
}


module.exports = new Auth();
