const { db } = require('../db');
const { Game } = require('../models');
const UsersORM = require('./users');

class Games {
    constructor() {
        this.name = 'games';
        this.users = 'users';
        this.msgNoUser = 'This user not exist';
        this.msgNoCreateGame = 'Dont create game';
        this.msgNoExistGame = 'This game not exist';
        this.msgNoCreateGame = 'Dont create answer';
    }

    async getOponent() {
        const games = await db.select(this.users, [], { deleted: false });
        const max = games.length - 1;
        const pos = Math.round(Math.random() * max);
        return games[pos];
    }

    async getAll(page, filters) {
        let result = null;
        const filtersObj = await this.getFilters(filters)
            .catch(err => Promise.reject(err));
        await db.selectPaged(this.name, filtersObj, [], page)
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

    async getFilters(query) {
        const result = [];
        if (query.player1) {
            await UsersORM.getByNickname(query.player1)
                .then((usr) => { result.player1 = usr.getId(); });
        }
        if (query.player2) {
            await UsersORM.getByNickname(query.player2)
                .then((usr) => { result.player2 = usr.getId(); });
        }
        if (query.scorePlayer1Min) {
            result.push({
                attrib: 'scoreplayer1',
                opr: '>=',
                val: query.scorePlayer1Min,
            });
        }
        if (query.scorePlayer1Max) {
            result.push({
                attrib: 'scoreplayer1',
                opr: '<=',
                val: query.scorePlayer1Max,
            });
        }
        if (query.scorePlayer2Min) {
            result.push({
                attrib: 'scoreplayer2',
                opr: '>=',
                val: query.scorePlayer2Min,
            });
        }
        if (query.scorePlayer2Max) {
            result.push({
                attrib: 'scoreplayer2',
                opr: '<=',
                val: query.scorePlayer2Max,
            });
        }
        if (typeof (query.finished) !== 'undefined') {
            result.finished = query.finished;
        }
        return result;
    }
}

module.exports = new Games();
