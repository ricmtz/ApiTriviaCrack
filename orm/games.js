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
        let result = null;
        const game = new Game(data);
        // await this.existsAttribs(game)
        //     .catch(err => Promise.reject(err));
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
        await db.insert(this.name, game)
            .catch((err) => { Promise.reject(err); });
        await db.selectNonDel(this.name, { player1: idP1, player2: idP2 }, ['id'])
            .then((res) => { result = this.processResult(res); })
            .catch(err => Promise.reject(err));
        game.setId(result.getId());
        return game;
    }

    async update(gameId, data) {
        await db.selectNonDel(this.name, { id: gameId }, ['id'])
            .catch(() => Promise.reject(new Error(this.msgNoExistGame)));
        const game = new Game(data);
        await this.existsAttribs(game)
            .catch(err => Promise.reject(err));
        await db.update(this.name, game, { id: gameId, deleted: false })
            .catch(err => Promise.reject(err));
    }

    async delete(gameId) {
        await db.selectNonDel(this.name, { id: gameId }, ['id'])
            .catch(() => Promise.reject(new Error(this.msgNoExistGame)));
        await db.delete(this.name, { id: gameId })
            .catch(err => Promise.reject(err));
    }

    async getPosPlayer(userid) {
        let data = { player1: userid };
        let exist = await this.existData(this.name, data);
        if (exist) return 1;
        data = { player2: userid };
        exist = await this.existData(this.name, data);
        return (exist) ? 2 : 0;
    }

    async addAnswer(data) {
        const answer = new Answer(data);
        let result = await db.select(this.name, ['id'], { id: answer.getGame() });
        if (result.length === 0) return this.msgNoExistGame;
        result = await db.select(this.questions, ['id'], { id: answer.getQuestion() });
        if (result.length === 0) return this.msgNoExistQuestion;
        result = await db.select(this.users, ['id'], { nickname: answer.getPlayer() });
        if (result.lenght === 0) return this.msgNoUser;
        answer.setPlayer(result[0].id);
        const user = await this.getPosPlayer(answer.getPlayer());
        if (user === 0) return this.msgNoUser;
        const conditions = { id: answer.getQuestion(), optioncorrect: answer.getOption() };
        result = await db.select(this.questions, ['id'], conditions);
        if (result.length === 0) answer.setCorrect(false);
        else answer.setCorrect(true);
        result = await db.insert(this.answers, answer);
        result = await db.select(this.answers, ['id'], answer); // FIXME Podrian construir el objeto con los datos que mandaron sin necesidad de hacer otro query
        if (result.length === 0) return this.msgNoCreateAnswers;
        return result[result.length - 1];
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
        let error = null;
        error = await db.exists(this.users, { nickname: game.getPlayer1() })
            .catch(() => { });
        if (!error) {
            return Promise.reject(new Error(this.msgNoUser));
        }
        error = await db.exists(this.users, { nickname: game.getPlayer2() })
            .catch(() => { });
        if (!error) {
            return Promise.reject(new Error(this.msgNoUser));
        }
        return null;
    }
}

module.exports = new Games();
