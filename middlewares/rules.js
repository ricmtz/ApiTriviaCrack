const validator = require('./validator');

// FIXME Este diseño centralizado puede afectar en el mantenimiento, ya que al ver
// una ruta no es claras su validaciones hasta que se viene hasta este archivo.
// No es malo!!! solo una manera diferente.

class Rules {
    /**
     * Validator middleware that add the rules to validate
     * categoryId parameter.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
    static paramsCategories(req, res, next) {
        validator.validate(req, res, next, {
            params: {
                categoryId: 'id,required',
            },
        });
    }

    /**
     * Validator middleware that add the rules to validate
     * the friendNickname parameter.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
    static paramsFriends(req, res, next) {
        validator.validate(req, res, next, {
            params: {
                friendNickname: 'nickname,required',
            },
        });
    }

    /**
     * Validator middleware that add the rules to validate
     * questionId parameter.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
    static paramsGamesQuestions(req, res, next) {
        validator.validate(req, res, next, {
            params: {
                questionId: 'id,required',
            },
        });
    }

    /**
     * Validator middleware that add the rules to validate
     * gameId parameter.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
    static paramsGames(req, res, next) {
        validator.validate(req, res, next, {
            params: {
                gameId: 'id,required',
            },
        });
    }

    /**
     * Validator middleware that add the rules to validate
     * question parameter.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
    static paramsQuestions(req, res, next) {
        validator.validate(req, res, next, {
            params: {
                question: 'id,required',
            },
        });
    }

    /**
     * Validator middleware that add the rules to validate
     * nickname parameter.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
    static paramsUser(req, res, next) {
        validator.validate(req, res, next, {
            params: {
                nickname: 'nickname,required',
            },
        });
    }

    /**
     * Validator middleware that add the rules to validate
     * the nickname, password and email values from the request
     * body.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
    static createUser(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                nickname: 'nickname,required',
                password: 'password,required',
                email: 'email,required',
            },
        });
    }

    /**
     * Validator middleware that add the rules to validate the
     * optional values of nickname, password, email, score,
     * admin, avatar from the resquest body.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
    static updateUser(req, res, next) {
        validator.validate(req, res, next, {
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

    /**
     * Validator middleware that add the rules to validate
     * nickname from the request body.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
    static createFriend(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                nickname: 'nickname,required',
            },
        });
    }

    /**
     * Validator middleware that add the rules to validate
     * the email from the request body.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
    static checkEmail(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                email: 'email,required',
            },
        });
    }

    /**
     * Validator middleware that add the rules to validate
     * the new Email and oldEmail from request body.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
    static updateEmail(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                newEmail: 'email,required',
                oldEmail: 'email,required',
            },
        });
    }

    /**
     * Validator middleware that add the rules to validate
     * the player1 and player2 nickname from the request
     * body.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
    static createGame(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                player1: 'nickname,required',
                player2: 'nickname,optional',
            },
        });
    }

    /**
     * Validator middleware that add the rules to validate the
     * optional vlues of player1 and player 2 nickname from the
     * request body.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
    static updateGame(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                player1: 'nickname,optional',
                player2: 'nickname,optional',
            },
        });
    }

    /**
     * Validator middleware that add the rules to validate
     * the question, player and option from the request
     * body.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
    static createGameQuestion(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                question: 'id,required',
                player: 'text,required',
                option: 'text,required',
            },
        });
    }

    /**
     * Validator middleware that add the rules to validate the
     * optional value of game, question, player and selectedoption
     * from the request body.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
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

    /**
     * Validator middleware that add the rules to validate
     * the category, question, option1, option2, optioncorrect
     * and userid from the request body.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
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

    /**
     * Validator middleware that add the rules to validate the
     * optional vallues of category, question, option1, option2,
     * optioncorrect and approved from the request body.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
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

    /**
     * Validator middleware that add the rules to validate
     * the name and color from the request body.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
    static createCategory(req, res, next) {
        validator.validate(req, res, next, {
            body: {
                name: 'text,required',
                color: 'text,required',
            },
        });
    }

    /**
     * Validator middleware that add the rules to validate the
     * optional vlues of name, color and icon from the request body.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
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
