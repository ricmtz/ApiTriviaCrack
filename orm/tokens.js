const { db } = require('../db');
const { Token } = require('../models');

class Tokens {
    constructor() {
        this.name = 'tokens';
        this.msgNoToken = 'Token not found';
        this.msgNoCreateToken = 'Could not create token';

        this.active = this.active.bind(this);
        this.get = this.get.bind(this);
        this.existData = this.existData.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
    }

    async active(searchToken) {
        const exist = await this.existData(this.name, { token: searchToken });
        if (exist) return this.msgExistToken;

        const tokenObj = await db.select(this.name, [], { token: searchToken });
        if (tokenObj.getExpires() - new Date() < 0) {
            await db.update(this.name, { status: '0' }, { token: tokenObj.getToken() });
            return false;
        }
        return true;
    }

    async get(searchToken) {
        const data = { token: searchToken };
        const result = await db.select(this.name, [], data);
        return result.length !== 0 ? new Token(result[0]) : this.msgNoToken;
    }

    async existData(table, condition) {
        const result = await db.select(table, ['count(*)'], condition);
        return (result[0].count != 0);
    }

    processResult(rows) {
        if (!rows) {
            return null;
        }

        if (!Array.isArray(rows)) {
            return new Token(rows);
        }

        if (rows.length === 1) {
            return new Token(rows[0]);
        }

        const usersList = [];
        rows.forEach((row) => { usersList.push(new Token(row)); });
        return usersList;
    }

    async create(data) {
        let result = null;
        const tokenObj = new Token(data);

        await db.insert(this.name, tokenObj).catch(err => Promise.reject(err));
        await db.select(this.name, { token: tokenObj.getToken() }, ['id'])
            .then((res) => { result = this.processResult(res); })
            .catch(err => Promise.reject(err));

        if (result) {
            tokenObj.setId(result.getId());
            return tokenObj;
        }

        return Promise.reject(this.msgNoCreateToken);
    }

    async delete(searchToken) {
        let res = await db.select(this.name, ['id'], { token: searchToken });
        if (res.length === 0) return this.msgNoToken;

        const data = { status: '0' };
        res = await db.update(this.name, data, { token: searchToken });

        res = await db.select(this.name, ['id'], data);
        return res;
    }
}

module.exports = new Tokens();
