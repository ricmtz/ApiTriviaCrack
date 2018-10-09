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

    static createGame(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                player1: 'id,required',
                player2: 'id,optional',
            },
        });
    }

    static updateGame(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                player1: 'id,optional',
                player2: 'id,optional',
            },
        });
    }

    static createGameQuestion(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                game: 'id,required',
                question: 'id,required',
                player: 'id,required',
            },
        });
    }

    static updateGameQuestion(req, res, next) {
        validator.validate(req, res, next, {
            game: 'id,optional',
            question: 'id,optional',
            player: 'id,optional',
            selectedoption: 'word,optional',
        });
    }
}

module.exports = Rules;
