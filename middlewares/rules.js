const validator = require('./validator');

// Este diseño centralizado puede afectar en el mantenimiento, ya que al ver
// una ruta no es claras su validaciones hasta que se viene hasta este archivo.
// No es malo!!! solo una manera diferente.

class Rules {
    static getAllElements(req, res, next) {
        validator.validate(req, res, next, {
            query: {
                page: 'positive,optional',
            },
        });
    }

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
     * answerId parameter.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Function} next Express next middleware function
     */
    static paramsAnswers(req, res, next) {
        validator.validate(req, res, next, {
            params: {
                answerId: 'id,required',
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

    static queryUser(req, res, next) {
        validator.validate(req, res, next, {
            query: {
                nickname: 'text,optional',
                email: 'text,optional',
                admin: 'boolean,optional',
                scoreMin: 'positive,optional',
                scoreMax: 'positive,optional',
            },
        });
    }

    static queryFriend(req, res, next) {
        validator.validate(req, res, next, {
            query: {
                user2: 'text,optional',
            },
        });
    }

    static queryEmail(req, res, next) {
        validator.validate(req, res, next, {
            query: {
                email: 'text,optional',
            },
        });
    }

    static queryGame(req, res, next) {
        validator.validate(req, res, next, {
            query: {
                player1: 'nickname,optional',
                player2: 'nickname,optional',
                scorePlayer1Min: 'positive,optional',
                scorePlayer1Max: 'positive,optional',
                scorePlayer2Min: 'positive,optional',
                scorePlayer2Max: 'positive,optional',
                finished: 'boolean,optional',
            },
        });
    }

    static queryQuestion(req, res, next) {
        validator.validate(req, res, next, {
            query: {
                category: 'text,optional',
                question: 'text,optional',
                option1: 'text,optional',
                option2: 'text,optional',
                optioncorrect: 'text,optional',
                approved: 'boolean,optional',
                user: 'nickname,optional',
            },
        });
    }

    static queryAnswer(req, res, next) {
        validator.validate(req, res, next, {
            query: {
                player: 'nickname,optional',
                question: 'text,optional',
                option: 'text,optional',
                correct: 'boolean,optional',
            },
        });
    }

    static queryCategory(req, res, next) {
        validator.validate(req, res, next, {
            query: {
                name: 'text,optional',
                random: 'boolean,optional',
            },
        });
    }

    static userScoreConv(req, res, next) {
        if (req.query.scoreMin) {
            req.query.scoreMin = Number(req.query.scoreMin);
        }
        if (req.query.scoreMax) {
            req.query.scoreMax = Number(req.query.scoreMax);
        }
        next();
    }

    static userScores(req, res, next) {
        if (typeof (req.query.scoreMin) === 'number'
            && typeof (req.query.scoreMax) === 'number'
            && req.query.scoreMax < req.query.scoreMin) {
            next(new Error('Validation error'));
            return;
        }
        next();
    }

    static gameScoreConv(req, res, next) {
        if (req.query.scorePlayer1Min) {
            req.query.scorePlayer1Min = Number(req.query.scorePlayer1Min);
        }
        if (req.query.scorePlayer1Max) {
            req.query.scorePlayer1Max = Number(req.query.scorePlayer1Max);
        }
        if (req.query.scorePlayer2Min) {
            req.query.scorePlayer2Min = Number(req.query.scorePlayer2Min);
        }
        if (req.query.scorePlayer2Max) {
            req.query.scorePlayer2Max = Number(req.query.scorePlayer2Max);
        }
        next();
    }

    static answerConv(req, res, next) {
        if (req.body.question) {
            req.body.question = Number(req.body.question);
        }
        next();
    }

    static questionConv(req, res, next) {
        if (req.body.category) {
            req.body.category = Number(req.body.category);
        }
        next();
    }

    static categoryConv(req, res, next) {
        if (req.query.random) {
            req.query.random = (req.query.random === 'true');
        }
        next();
    }

    static gameScores(req, res, next) {
        if (typeof (req.query.scorePlayer1Min) === 'number'
            && typeof (req.query.scorePlayer1Max) === 'number'
            && req.query.scorePlayer1Max < req.query.scorePlayer1Min) {
            next(new Error('Validation error'));
            return;
        }
        if (typeof (req.query.scorePlayer2Min) === 'number'
            && typeof (req.query.scorePlayer2Max) === 'number'
            && req.query.scorePlayer2Max < req.query.scorePlayer2Min) {
            next(new Error('Validation error'));
            return;
        }
        next();
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
        if (req.file !== undefined) {
            req.body.avatar = req.file.originalname;
        }
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
        if (req.file !== undefined) {
            req.body.icon = req.file.originalname;
        }
        validator.validate(req, res, next, {
            body: {
                color: 'text,required',
                name: 'text,required',
                icon: 'file,optional',
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
        if (req.file !== undefined) {
            req.body.icon = req.file.originalname;
        }
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
