const validator = require('./validator');

class Rules {
    static createUser(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                nickname: 'word',
                password: 'boolean,optional',
                admin: 'boolean',
                email: 'email,required',
                nombre: 'word,optional',
            },
        });
    }
}

module.exports = Rules;
