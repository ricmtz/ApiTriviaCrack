const validator = require('./validator');

class Rules {
    static createUser(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                nickname: 'nickname,required',
                password: 'password,required',
                email: 'email,required',
            },
        });
    }

    static paramsUser(req, res, next) {
        validator.validate(req, res, next, {
            params: {
                nickname: 'nickname,required',
            },
        });
    }

    static updateUser(req, res, next) {
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

    static createFriend(req, res, next) {
        validator.validate(req, res, next, {
            params: {
                nickname: 'nickname',
            },
            body: {
                nickname: 'nickname,required',
            },
        });
    }

    static paramsFriends(req, res, next) {
        validator.validate(req, res, next, {
            params: {
                nickname: 'nickname',
                friendNickname: 'nickname',
            },
        });
    }

    static createEmail(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                email: 'email,required',
            },
        });
    }

    static updateEmail(req, res, next) {
        validator.validate(req, res, next, {
            params: {
                emailId: 'id,required',
            },
            body: {
                email: 'email,required',
            },
        });
    }

    static paramsEmails(req, res, next) {
        validator.validate(req, res, next, {
            params: {
                emailId: 'id,required',
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
            body: {
                game: 'id,optional',
                question: 'id,optional',
                player: 'id,optional',
                selectedoption: 'text,optional',
            },
        });
    }
}

module.exports = Rules;
