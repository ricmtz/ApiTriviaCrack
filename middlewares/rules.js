const validator = require('./validator');

// FIXME Este diseño centralizado puede afectar en el mantenimiento, ya que al ver
// una ruta no es claras su validaciones hasta que se viene hasta este archivo.
// No es malo!!! solo una manera diferente.
// FIXME Todos los métodos deben estar documentados

class Rules {
    static getAllElements(req, res, next) {
        validator.validate(req, res, next, {
            query: {
                page: 'positive,optional',
            },
        });
    }

    static createUser(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                nickname: 'nickname,required',
                password: 'password,required',
                email: 'email,required',
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

    static paramsUser(req, res, next) {
        validator.validate(req, res, next, {
            params: {
                nickname: 'nickname,required',
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
            body: {
                newEmail: 'email,required',
                oldEmail: 'email,required',
            },
        });
    }

    static paramsEmails(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                email: 'email,required',
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
            params: {
                gameId: 'id,required',
            },
            body: {
                question: 'id,required',
                player: 'text,required',
                option: 'text,required',
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
                userid: 'id,required',
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

    static paramsCategory(req, res, next) {
        validator.validate(req, res, next, {
            params: {
                categoryId: 'id,required',
            },
        });
    }
}

module.exports = Rules;
