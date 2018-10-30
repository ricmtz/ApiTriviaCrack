const { db } = require('../db');
const { Game, Answer } = require('../models');
const UsersORM = require('./users');
const QuestionsORM = require('./questions');

class Games {
    constructor() {
        this.name = 'games';
        this.users = 'users';
        this.answers = 'games_questions';
        this.questions = 'questions';
        this.msgNoUser = 'This user not exist';
        this.msgNoCreateGame = 'Dont create game';
        this.msgNoExistGame = 'This game not exist';
        this.msgNoExistQuestion = 'This question not exist';
        this.msgNoCreateGame = 'Dont create answer';
        this.msgNoUpdate = 'Dont update this data';
        this.msgMaxQuestions = 'You answered your 10 questions';
        this.msgNoExistOption = 'Option does not exist';
        this.msgNoExistAnsware = 'This answare not exist';
    }

    async getOponent() {
        const games = await db.select(this.users, [], { deleted: false });
        const max = games.length - 1;
        const pos = Math.round(Math.random() * max);
        return games[pos];
    }

    async getAll(page) {
        let result = null;
        await db.selectPaged(this.name, {}, [], page)
            .then((res) => { result = this.processResult(res); })
            .catch(err => Promise.reject(err));
        await this.appendValuesGames(result)
            .catch(err => Promise.reject(err));
        return result;
    }

    async get(gameId) {
        let result = null;
        await db.selectNonDel(this.name, { id: gameId }, [])
            .then((res) => { result = this.processResult(res); })
            .catch(() => Promise.reject(new Error(this.msgNoExistGame)));
        await this.appendValuesGame(result)
            .catch(err => Promise.reject(err));
        return result;
    }

    async create(data) {
        const game = new Game(data);
        await this.existsAttribs(game)
            .catch(err => Promise.reject(err));
        let idP1 = null;
        await UsersORM.getByNickname(game.getPlayer1())
            .then((usr) => { idP1 = usr.getId(); })
            .catch((err) => { Promise.reject(err); });
        game.setPlayer1(idP1);
        let idP2 = null;
        await UsersORM.getByNickname(game.getPlayer2())
            .then((usr) => { idP2 = usr.getId(); })
            .catch((err) => { Promise.reject(err); });
        game.setPlayer2(idP2);
        await db.insert(this.name, game, 'id')
            .then((res) => { game.setId(res); })
            .catch((err) => { Promise.reject(err); });
        return game;
    }

    async update(gameId, data) {
        await db.exists(this.name, { id: gameId }, ['id'])
            .catch(() => Promise.reject(new Error(this.msgNoExistGame)));
        const game = new Game(data);
        await this.existsAttribs(game)
            .catch(err => Promise.reject(err));
        if (game.getPlayer1()) {
            await UsersORM.getByNickname(game.getPlayer1())
                .then((res) => { game.setPlayer1(res.getId()); })
                .catch((err) => { Promise.reject(err); });
        }
        if (game.getPlayer2()) {
            await UsersORM.getByNickname(game.getPlayer2())
                .then((res) => { game.setPlayer2(res.getId()); })
                .catch((err) => { Promise.reject(err); });
        }
        await db.update(this.name, game, { id: gameId, deleted: false })
            .catch(err => Promise.reject(err));
    }

    async delete(gameId) {
        await db.selectNonDel(this.name, { id: gameId }, ['id'])
            .catch(() => Promise.reject(new Error(this.msgNoExistGame)));
        await db.delete(this.name, { id: gameId })
            .catch(err => Promise.reject(err));
    }

    async getAllGamesQuestions(gameId, page) {
        let result = null;
        await db.selectPaged(this.answers, { game: gameId }, [], page)
            .then((res) => { result = this.processResultAnsw(res); })
            .catch(err => Promise.reject(err));
        await this.appendValuesAnswers(result)
            .catch(err => Promise.reject(err));
        return result;
    }

    async getGameQuestion(gameId, questionId) {
        let result = null;
        await db.select(this.answers, { game: gameId, id: questionId }, [])
            .then((res) => { result = this.processResultAnsw(res); })
            .catch(() => Promise.reject(new Error(this.msgNoExistAnsware)));
        await this.appendValuesAnswer(result)
            .catch(err => Promise.reject(err));
        return result;
    }

    async addAnswer(data) {
        const answer = new Answer(data);
        await UsersORM.getByNickname(answer.getPlayer())
            .then((res) => { answer.setPlayer(res.getId()); })
            .catch((err) => { Promise.reject(err); });
        await this.existsAttribsAnsw(answer)
            .catch(err => Promise.reject(err));
        await db.selectNonDel(this.questions,
            { id: answer.getQuestion(), optioncorrect: answer.getOption() })
            .then(() => { answer.setCorrect(true); })
            .catch(() => { answer.setCorrect(false); });
        await db.insert(this.answers, answer, 'id')
            .then((res) => { answer.setId(res); })
            .catch(err => Promise.reject(err));
        await this.finishGame(answer)
            .catch(err => Promise.reject(err));
        return answer;
    }

    async finishGame(answer) {
        let num = null;
        await db.countRegs(this.answers,
            { game: answer.getGame(), player: answer.getPlayer() })
            .then((res) => { num = res; })
            .catch(err => Promise.reject(err));
        if (num >= 10) {
            const numCorrect = await db.countRegs(this.answers,
                {
                    game: answer.getGame(),
                    player: answer.getPlayer(),
                    correct: true,
                })
                .catch(err => Promise.reject(err));
            const posUsr = await this.getPosPlayer(answer.getGame(), answer.getPlayer());
            const result = {};
            if (posUsr) {
                result[posUsr] = numCorrect;
                await this.update(answer.getGame(), result)
                    .catch((err) => { Promise.reject(err); });
            }

            const game = await this.get(answer.getGame())
                .catch(err => Promise.reject(err));
            if (game.getScoreplayer1() !== -1 && game.getScoreplayer2() !== -1) {
                await this.update(game.getId(), { finished: true })
                    .catch(err => Promise.reject(err));
            }
        }
    }

    async updateGameQuestion(gameId, questionId, data) {
        await db.exists(this.answers, { game: gameId, question: questionId })
            .catch(() => Promise.reject(new Error(this.msgNoExistAnsware)));
        const answer = new Answer(data);
        await this.existsAttribsAnsw(answer)
            .catch(err => Promise.reject(err));
        await db.update(this.answers, answer, { game: gameId, question: questionId })
            .catch(err => Promise.reject(err));
    }

    async deleteGameQuestion(gameId, questionId) {
        await db.exists(this.answers, { game: gameId, question: questionId })
            .catch(() => Promise.reject(new Error(this.msgNoExistAnsware)));
        await db.delete(this.answers, { game: gameId, question: questionId })
            .catch(err => Promise.reject(err));
    }

    processResult(rows) {
        if (!rows) {
            return null;
        }
        if (!Array.isArray(rows)) {
            return new Game(rows);
        }
        if (rows.length === 1) {
            return new Game(rows[0]);
        }
        const categoriesList = [];
        rows.forEach((row) => { categoriesList.push(new Game(row)); });
        return categoriesList;
    }

    processResultAnsw(rows) {
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

    async existsAttribs(game) {
        let exist = null;
        if (game.getPlayer1()) {
            exist = await db.exists(this.users, { nickname: game.getPlayer1() })
                .catch(() => { });
            if (!exist) {
                return Promise.reject(new Error(this.msgNoUser));
            }
        }
        if (game.getPlayer2()) {
            exist = await db.exists(this.users, { nickname: game.getPlayer2() })
                .catch(() => { });
            if (!exist) {
                return Promise.reject(new Error(this.msgNoUser));
            }
        }
        return null;
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

    async existsPlayer(gameId, userId) {
        const p1 = await db.exists(this.name, { id: gameId, player1: userId })
            .catch(() => { });
        const p2 = await db.exists(this.name, { id: gameId, player2: userId })
            .catch(() => { });
        if (!p1 || !p2) {
            return Promise.reject(new Error(this.msgNoUser));
        }
        return null;
    }

    async getPosPlayer(gameId, userId) {
        const p1 = await db.exists(this.name, { id: gameId, player1: userId })
            .catch(() => { });
        const p2 = await db.exists(this.name, { id: gameId, player2: userId })
            .catch(() => { });
        if (p1) {
            return 'scoreplayer1';
        }
        if (p2) {
            return 'scoreplayer2';
        }
        return null;
    }

    async appendValuesGame(game) {
        await UsersORM.get(game.getPlayer1())
            .then((res) => { game.setPlayer1(res.getNickname()); })
            .catch(err => Promise.reject(err));
        await UsersORM.get(game.getPlayer2())
            .then((res) => { game.setPlayer2(res.getNickname()); })
            .catch(err => Promise.reject(err));
    }

    async appendValuesGames(games) {
        if (!Array.isArray(games)) {
            await this.appendValuesGame(games)
                .catch(err => Promise.reject(err));
        } else {
            const promises = [];
            for (let i = 0; i < games.length; i += 1) {
                promises.push(this.appendValuesGame(games[i]));
            }
            await Promise.all(promises)
                .catch(err => Promise.reject(err));
        }
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
}

module.exports = new Games();
