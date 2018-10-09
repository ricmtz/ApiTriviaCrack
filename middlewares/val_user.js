const validator = require('./validator');

class ValUsers {
    static create(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                nickname: 'nickname,required',
                password: 'password,required',
                email: 'email,required',
            },
        });
    }

    static params(req, res, next) {
        validator.validate(req, res, next, {
            params: {
                nickname: 'nickname,required',
            },
        });
    }

    static update(req, res, next) {
        validator.validate(req, res, next, {
            params: {
                nickname: 'nickname',
            },
            body: {
                nickname: 'nickname,optional',
                password: 'password,optional',
                email: 'email,optional',
                score: 'positive,optional',
                admin: 'boolean,optional',
                avatar: 'file,optional',
            },
        });
    }
}

module.exports = ValUsers;
