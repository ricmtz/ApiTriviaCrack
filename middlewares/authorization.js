const { QuestionsORM, GamesORM, AnswersORM } = require('../orm');

class Authorization {
    constructor() {
        this.answerGet = this.answerGet.bind(this);

        this.permissions = {
            admin: {
                users: {
                    GET: this.allowed,
                    POST: this.allowed,
                    PATCH: this.allowed,
                    DELETE: this.allowed,
                },
                emails: {
                    GET: this.allowed,
                    POST: this.allowed,
                    PATCH: this.allowed,
                    DELETE: this.allowed,
                },
                friends: {
                    GET: this.allowed,
                    POST: this.allowed,
                    PATCH: this.allowed,
                    DELETE: this.allowed,
                },
                categories: {
                    GET: this.allowed,
                    POST: this.allowed,
                    PATCH: this.allowed,
                    DELETE: this.allowed,
                },
                questions: {
                    GET: this.allowed,
                    POST: this.allowed,
                    PATCH: this.allowed,
                    DELETE: this.allowed,
                },
                games: {
                    GET: this.allowed,
                    POST: this.allowed,
                    PATCH: this.allowed,
                    DELETE: this.allowed,
                },
                answers: {
                    GET: this.allowed,
                    POST: this.allowed,
                    PATCH: this.allowed,
                    DELETE: this.allowed,
                },
            },
            user: {
                users: {
                    GET: this.allowed,
                    PATCH: this.sameNick,
                    DELETE: this.sameNick,
                },
                emails: {
                    GET: this.sameNick,
                    POST: this.sameNick,
                    PATCH: this.sameNick,
                    DELETE: this.sameNick,
                },
                friends: {
                    GET: this.sameNick,
                    POST: this.sameNick,
                    DELETE: this.sameNick,
                },
                categories: {
                    GET: this.allowed,
                    POST: this.notAllowed,
                    PATCH: this.notAllowed,
                    DELETE: this.notAllowed,
                },
                questions: {
                    GET: this.questionGet,
                    POST: this.allowed,
                    PATCH: this.questionPatch,
                    DELETE: this.questionDelete,
                },
                games: {
                    GET: this.gameGet,
                    POST: this.allowed,
                    PATCH: this.notAllowed,
                    DELETE: this.notAllowed,
                },
                answers: {
                    GET: this.answerGet,
                    POST: this.gameGet,
                    PATCH: this.notAllowed,
                    DELETE: this.notAllowed,
                },
            },
        };
    }

    async canDo(method, route, user, params, filters) {
        const role = user.getAdmin() ? 'admin' : 'user';
        let url = route.split('?')[0].split('/').filter(el => (el));
        url = url[url.length % 2 ? url.length - 1 : url.length - 2];
        let response = await this.permissions[role][url][method](user, params, filters)
            .catch(() => { response = false; });
        return response;
    }

    async sameNick(user, params, filters) {
        return user.getNickname() === params.nickname
            || user.getNickname() === filters.nickname;
    }

    async allowed() {
        return true;
    }

    async notAllowed() {
        return false;
    }

    async questionGet(user, params, filters) {
        if (filters.random) {
            return true;
        }
        if (!params.question && filters.user !== user.getNickname()) {
            return false;
        }
        if (!params.question && filters.user === user.getNickname()) {
            return true;
        }
        try {
            const question = await QuestionsORM.get(params.question);
            return question.getUser() === user.getNickname();
        } catch (e) {
            return false;
        }
    }

    async questionPatch(user, params) {
        try {
            const question = await QuestionsORM.get(params.question);
            return question.getUser() === user.getNickname() && !question.getApproved();
        } catch (e) {
            return false;
        }
    }

    async questionDelete(user, params) {
        try {
            const question = await QuestionsORM.get(params.question);
            return question.getUser() === user.getNickname() && !question.getApproved();
        } catch (e) {
            return false;
        }
    }

    async gameGet(user, params, filters) {
        if (!params.gameId
            && (filters.player1 !== user.getNickname()
            && filters.player2 !== user.getNickname())) {
            return false;
        }
        if (!params.gameId) {
            return true;
        }
        try {
            const game = await GamesORM.get(params.gameId);
            return game.getPlayer1() === user.getNickname()
            || game.getPlayer2() === user.getNickname();
        } catch (e) {
            return false;
        }
    }

    async answerGet(user, params, filters) {
        let gameValidations;
        try {
            gameValidations = await this.gameGet(user, params, filters);
        } catch (e) {
            return false;
        }
        if (filters.player) {
            return gameValidations && filters.player === user.getNickname();
        }
        try {
            const answer = await AnswersORM.get(params.gameId, params.answerId);
            return gameValidations && answer.getPlayer() === user.getNickname();
        } catch (e) {
            return false;
        }
    }
}

module.exports = new Authorization();
