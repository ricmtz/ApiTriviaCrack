const bcrypt = require('bcrypt');
const { UsersORM, TokensORM } = require('../orm');


class Auth {
    static register(req, res, next) {
        const user = UsersORM.create(req.body);
        if (typeof (user) !== typeof (User)) next(user);

        const token = this.createToken(user);
        if (typeof (token) !== typeof (Token)) next(token);

        res.send({ data: { token: token.getToken() } }).status(201);
        next();
    }

    static createToken(user) {
        let res = null;

        const currDate = new Date();
        const expireDate = new Date(currDate);
        expireDate.setHours(expireDate.getHours() + process.env.SESSION_TIME);

        bcrypt.hash(`${user.getNickname()}${process.env.SECRET}`, process.env.SALT_ROUNDS, (err, hash) => {
            if (err) {
                res = err;
                return;
            }

            res = TokensORM.create({
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

    static login(req, res, next) {
        const user = UsersORM.login(req.body);
        if (typeof (user) !== typeof (User)) next(user);

        let token = TokensORM.get(req.body.token);
        if (typeof (token) !== typeof (Token)) next(token);

        if (!token.getToken()) token = this.createToken(user);

        res.send({ data: { token: token.getToken() } }).status(201);
    }

    static logout(req, res, next) {
        if (!req.body.token) next('Token missing');
        TokensORM.delete(req.body.token);
        res.send().status(204);
        next();
    }

    static session(res, req, next) {
        if (!req.body.token) next({ data: 'Token missing' });
        const token = TokensORM.get(req.body.token);
        if (typeof (token) !== typeof (Token)) next(token);

        if (TokensORM.active(token.getToken())) next();
        else next({ data: 'The session has expired' });
    }
}


module.exports = Auth;
