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
}

module.exports = ValUsers;
