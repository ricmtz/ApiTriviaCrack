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

    static getUser(req, res, next) {
        validator.validate(req, res, next, {
            params: {
                nickname: 'nickname,required',
            },
        });
    }

    static update(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                nickname: 'nickname',
                password: 'password',
                email: 'email',
                score: 'positive',
                admin: 'boolean',
                avatar: 'file',
            },
        });
    }
}

module.exports = ValUsers;
