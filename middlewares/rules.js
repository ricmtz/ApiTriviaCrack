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

    static getAllUsers(req, res, next) {
        validator.validate(req, res, next, {
            query: {
                page: 'positive,optional',
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
                player1: 'nickname,required',
                player2: 'nickname,optional',
            },
        });
    }

    static updateGame(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                player1: 'nickname,optional',
                player2: 'nickname,optional',
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

    static createQuestion(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                category: 'id,required',
                question: 'text,required',
                option1: 'text,required',
                option2: 'text,required',
                optioncorrect: 'text,required',
            },
        });
    }

    static updateQuestion(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                category: 'id,optional',
                question: 'text,optional',
                option1: 'text,optional',
                option2: 'text,optional',
                optioncorrect: 'text,optional',
                approved: 'boolean,optional',
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
                icon: 'file,optional',
            },
        });
    }
}

module.exports = Rules;
