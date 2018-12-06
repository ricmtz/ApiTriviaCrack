const { db } = require('../db');
const { Answer } = require('../models');
const UsersORM = require('./users');
const GamesORM = require('./games');
const QuestionsORM = require('./questions');
const { filters } = require('../filters');

class AnswersORM {
    constructor() {
        this.name = 'answers';
        this.games = 'games';
        this.users = 'users';
        this.questions = 'questions';
        this.msgNoUser = 'This user not exist';
        this.msgNoCreateGame = 'Dont create game';
        this.msgNoExistQuestion = 'This question not exist';
        this.msgNoCreateGame = 'Dont create answer';
        this.msgNoExistAnsware = 'This answare not exist';
    }

    async getAll(gameId, conditions) {
        let result = null;
        const filtersObj = await this.getFilters(conditions)
            .catch(err => Promise.reject(err));
        await db.selectPaged(this.name, { game: gameId, ...filtersObj }, [],
            conditions.page, conditions.random)
            .then((res) => { result = res; })
            .catch(err => Promise.reject(err));
        result.result = this.processResult(result.result);
        await this.appendValuesAnswers(result.result)
            .catch(err => Promise.reject(err));
        return result;
    }

    async get(gameId, questionId) {
        let result = null;
        await db.select(this.name, { game: gameId, id: questionId }, [])
            .then((res) => { result = this.processResult(res); })
            .catch(() => Promise.reject(new Error(this.msgNoExistAnsware)));
        await this.appendValuesAnswer(result)
            .catch(err => Promise.reject(err));
        return result;
    }

    async create(data) {
        const answer = new Answer(data);
        await this.existsAttribsAnsw(answer)
            .catch(err => Promise.reject(err));
        await db.selectNonDel(this.questions,
            { id: answer.getQuestion(), optioncorrect: answer.getOption() })
            .then(() => { answer.setCorrect(true); })
            .catch(() => { answer.setCorrect(false); });
        await db.insert(this.name, answer, 'id')
            .then((res) => { answer.setId(res); })
            .catch(err => Promise.reject(err));
        await this.finishGame(answer)
            .catch(err => Promise.reject(err));
        await this.appendValuesAnswer(answer)
            .catch(err => Promise.reject(err));
        return answer;
    }

    async finishGame(answer) {
        try {
            const num = await db.countRegs(this.name,
                { game: answer.getGame(), player: answer.getPlayer() });
            answer.ansNumber = num;
            if (num >= 10) {
                const numCorrect = await db.countRegs(this.name,
                    {
                        game: answer.getGame(),
                        player: answer.getPlayer(),
                        correct: true,
                    });
                const posUsr = await this.getPosPlayer(answer.getGame(),
                    answer.getPlayer());
                const result = {};
                if (posUsr) {
                    result[posUsr] = numCorrect;
                    await GamesORM.update(answer.getGame(), result)
                        .catch((err) => { Promise.reject(err); });
                }
                const user = await UsersORM.get(answer.getPlayer());
                await UsersORM.update(user.getNickname(),
                    { score: user.getScore() + numCorrect });

                const game = await GamesORM.get(answer.getGame())
                    .catch(err => Promise.reject(err));
                if (game.getScoreplayer1() !== -1 && game.getScoreplayer2() !== -1) {
                    await GamesORM.update(game.getId(), { finished: true })
                        .catch(err => Promise.reject(err));
                }
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async update(gameId, questionId, data) {
        await db.exists(this.name, { game: gameId, question: questionId })
            .catch(() => Promise.reject(new Error(this.msgNoExistAnsware)));
        const answer = new Answer(data);
        await this.existsAttribsAnsw(answer)
            .catch(err => Promise.reject(err));
        await db.update(this.name, answer, { game: gameId, question: questionId })
            .catch(err => Promise.reject(err));
    }

    async delete(gameId, questionId) {
        await db.exists(this.name, { game: gameId, question: questionId })
            .catch(() => Promise.reject(new Error(this.msgNoExistAnsware)));
        await db.delete(this.name, { game: gameId, question: questionId })
            .catch(err => Promise.reject(err));
    }

    async getPosPlayer(gameId, userId) {
        const p1 = await db.exists(this.games, { id: gameId, player1: userId })
            .catch(() => { });
        const p2 = await db.exists(this.games, { id: gameId, player2: userId })
            .catch(() => { });
        if (p1) {
            return 'scoreplayer1';
        }
        if (p2) {
            return 'scoreplayer2';
        }
        return null;
    }

    processResult(rows) {
        if (!rows) {
            return null;
        }
        if (!Array.isArray(rows)) {
            return new Answer(rows);
        }
        if (rows.length === 1) {
            return new Answer(rows[0]);
        }
        const categoriesList = [];
        rows.forEach((row) => { categoriesList.push(new Answer(row)); });
        return categoriesList;
    }

    async existsAttribsAnsw(answer) {
        let exist = null;
        if (answer.getGame()) {
            exist = await db.exists(this.name, { id: answer.getGame() })
                .catch(() => { });
            if (!exist) {
                return Promise.reject(new Error(this.msgNoCreateGame));
            }
        }
        if (answer.getQuestion()) {
            exist = await db.exists(this.questions, { id: answer.getQuestion() })
                .catch(() => { });
            if (!exist) {
                return Promise.reject(new Error(this.msgNoExistQuestion));
            }
        }
        if (answer.getPlayer()) {
            exist = await db.exists(this.users, { id: answer.getPlayer() })
                .catch(() => { });
            if (!exist) {
                return Promise.reject(new Error(this.msgNoUser));
            }
        }
        return null;
    }

    async appendValuesAnswer(answer) {
        await UsersORM.get(answer.getPlayer())
            .then((res) => { answer.setPlayer(res.getNickname()); })
            .catch(err => Promise.reject(err));
        await QuestionsORM.get(answer.getQuestion())
            .then((res) => { answer.setQuestion(res.getQuestion()); })
            .catch(() => { answer.setQuestion('Question deleted'); });
    }

    async appendValuesAnswers(answers) {
        if (!Array.isArray(answers)) {
            await this.appendValuesAnswer(answers)
                .catch(err => Promise.reject(err));
        } else {
            const promises = [];
            for (let i = 0; i < answers.length; i += 1) {
                promises.push(this.appendValuesAnswer(answers[i]));
            }
            await Promise.all(promises)
                .catch(err => Promise.reject(err));
        }
    }

    async getFilters(cond) {
        const result = [];
        if (cond.player) {
            await UsersORM.getByNickname(cond.player)
                .then((usr) => { result.player = usr.getId(); });
        }
        if (cond.question) {
            await QuestionsORM.getQuestion(cond.question)
                .then((que) => { result.question = que.getId(); });
        }
        if (cond.option) {
            result.option = filters.strFilter('option', cond.option);
        }
        if (typeof (cond.correct) !== 'undefined') {
            result.correct = cond.correct;
        }
        return result;
    }
}

module.exports = new AnswersORM();
