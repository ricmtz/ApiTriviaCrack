const { db } = require('../db');
const { Game, Answer } = require('../models');

class Users {
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

        this.msgExistNickname = 'This nickname already exists';
        this.msgExistEmail = 'This email already exists';
        this.msgNoExistEmail = 'This email not exists';
        this.msgSameUser = 'It is the same user';
        this.msgFriendExist = 'This friendship already exists';
        this.msgNoFriendExist = 'This friendship not exists';
    }

    async create(data) {
        const game = new Game(data);
        let result = await db.select(this.users, ['id'], { nickname: data.player1 });
        if (result.length === 0) return this.msgNoUser;
        game.setPlayer1(result[0].id);
        result = await db.select(this.users, ['id'], { nickname: data.player2 });
        if (result.length === 0) return this.msgNoUser;
        game.setPlayer2(result[0].id);
        result = await db.select(this.users, ['id'], { nickname: data.player1 });
        if (result === 0) return this.msgNoUser;
        result = await db.insert(this.name, game);
        result = await db.select(this.name, ['id'], game);
        if (result.length !== 0) {
            game.setId(result[result.length - 1].id);
            return game;
        }
        return this.msgNoCreateGame;
    }

    async get(idGame) {
        const conditions = { 'games.id': idGame, 'games.deleted': false };
        const columns = [
            { column: 'u1.nickname', as: 'player1' },
            { column: 'u2.nickname', as: 'player2' },
            { column: 'scoreplayer1', as: 'scoreplayer1' },
            { column: 'scoreplayer2', as: 'scoreplayer2' },
            { column: 'createdate', as: 'createdate' },
            { column: 'finished', as: 'finished' },
        ];
        const join = [
            {
                type: 'JOIN', table: 'users', as: 'u1', condition: 'u1.id = games.player1',
            },
            {
                type: 'JOIN', table: 'users', as: 'u2', condition: 'u2.id = games.player2',
            },
        ];
        const result = await db.select(this.name, columns, conditions, ' AND ', join);
        if (result.length === 0) return this.msgNoExistGame;
        return new Game(result[0]);
    }

    async getAll() {
        const conditions = { 'games.deleted': false };
        const columns = [
            { column: 'u1.nickname', as: 'player1' },
            { column: 'u2.nickname', as: 'player2' },
            { column: 'scoreplayer1', as: 'scoreplayer1' },
            { column: 'scoreplayer2', as: 'scoreplayer2' },
            { column: 'createdate', as: 'createdate' },
            { column: 'finished', as: 'finished' },
        ];
        const join = [
            {
                type: 'JOIN', table: 'users', as: 'u1', condition: 'u1.id = games.player1',
            },
            {
                type: 'JOIN', table: 'users', as: 'u2', condition: 'u2.id = games.player2',
            },
        ];
        const result = await db.select(this.name, columns, conditions, ' AND ', join);
        if (result.length === 0) return this.msgNoExistGame;
        const response = [];
        result.forEach((row) => {
            response.push(new Game(row));
        });
        return response;
    }

    async update(idGame, data) {
        const game = new Game(data);
        let result = await db.update(this.name, game, { id: idGame, deleted: false });
        result = await db.select(this.name, ['id'], data);
        return result;
    }

    async delete(idGame) {
        let result = await db.update(this.name, { deleted: true }, { id: idGame });
        return result;
    }

    async getPosPlayer(userid) {
        let data = { player1: userid };
        let exist = await this.existData(this.name, data);
        if (exist) return 1;
        data = { player2: userid };
        exist = await this.existData(this.name, data);
        return (exist) ? 2 : 0;
    }

    async existData(table, condition) {
        const result = await db.select(table, ['count(*)'], condition);
        return (result[0].count != 0);
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
        result = await db.select(this.answers, ['id'], answer);
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
}

module.exports = new Users();
