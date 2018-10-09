const validator = require('./validator');

class Rules {
    static createUser(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                nickname: 'word',
                password: 'positive,optional',
                admin: 'boolean',
                email: 'email,required',
            },
        });
    }

    static createCategory(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                name: 'text,required',
                color: 'text,required',
            },
        });
    }

    static updateCategory(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                name: 'text,optional',
                color: 'text,optional',
            },
        });
    }
}

module.exports = Rules;
