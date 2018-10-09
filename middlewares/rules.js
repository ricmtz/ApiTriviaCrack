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
                name: 'word,required',
                color: 'word,required',
            },
        });
    }

    static updateCategory(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                name: 'word,optional',
                color: 'word,optional',
            },
        });
    }
}

module.exports = Rules;
