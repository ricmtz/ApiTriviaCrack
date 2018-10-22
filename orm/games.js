const { db } = require('../db');
const { Game, Answer } = require('../models');
const UsersORM = require('./users');

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
        return result;
    }

    async get(gameId) {
        let result = null;
        await db.selectNonDel(this.name, { id: gameId }, [])
            .then((res) => { result = this.processResult(res); })
            .catch(() => Promise.reject(new Error(this.msgNoExistGame)));
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
        console.log(gameId, data);
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

    async addAnswer(data) {
        const answer = new Answer(data);
        await this.existsAttribsAnsw(answer)
            .catch(err => Promise.reject(err));
        await UsersORM.getByNickname(answer.getPlayer())
            .then((res) => { answer.setPlayer(res.getId()); })
            .catch((err) => { Promise.reject(err); });

        await this.existsPlayer(answer.getGame(), answer.getPlayer())
            .catch(err => Promise.reject(err));

        await db.selectNonDel(this.questions,
            { id: answer.getQuestion(), optioncorrect: answer.getOption() })
            .then(() => { answer.setCorrect(true); })
            .catch(() => { answer.setCorrect(false); });

        await db.insert(this.answers, answer, 'id')
            .then((res) => { answer.setId(res); })
            .catch(err => Promise.reject(err));
        return answer;
    }

    async finishGame(data) {
        const answer = new Answer(data);
        let result = await db.select(this.users, ['id'], { nickname: answer.getPlayer() });
        if (result.lenght === 0) return this.msgNoUser;
        answer.setPlayer(result[0].id);
        let conditions = { game: answer.getGame(), player: answer.getPlayer() };
        result = await db.select(this.answers, ['count(*)'], conditions);
        if (result[0].count >= 10) {
            conditions = { game: answer.getGame(), player: answer.getPlayer(), correct: true };
            result = await db.select(this.answers, ['count(*)'], conditions);
            const user = await this.getPosPlayer(answer.getPlayer());
            if (user === 1) conditions = { scoreplayer1: result[0].count };
            if (user === 2) conditions = { scoreplayer2: result[0].count };
            result = await this.update(answer.getGame(), conditions);
            result = await this.get(answer.getGame());
            console.log(result);
            if (result.legth !== 0) {
                if (result.scoreplayer1 !== -1 && result.scoreplayer2 !== -1) {
                    result = await this.update(answer.getGame(), { finished: true });
                    console.log(result);
                    return true;
                }
            }
        }
        return false;
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
        exist = await db.exists(this.name, { id: answer.getGame() })
            .catch(() => { });
        if (!exist) {
            return Promise.reject(new Error(this.msgNoCreateGame));
        }
        exist = await db.exists(this.questions, { id: answer.getQuestion() })
            .catch(() => { });
        if (!exist) {
            return Promise.reject(new Error(this.msgNoExistQuestion));
        }
        exist = await db.exists(this.users, { nickname: answer.getPlayer() });
        if (!exist) {
            return Promise.reject(new Error(this.msgNoUser));
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
}

module.exports = new Games();
