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
}

module.exports = Rules;
