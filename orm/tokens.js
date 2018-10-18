const { db } = require('../db');
const { Token } = require('../models');

class Tokens {
    constructor() {
        this.name = 'tokens';
        this.msgNoToken = 'Token not found';
        this.msgExistToken = 'Token already exists';
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

    async create(data) {
        const tokenObj = new Token(data);
        console.log('recibi token');
        console.table(tokenObj);
        const exist = await this.existData(this.name, { token: tokenObj.getToken() });
        if (exist) return this.msgExistToken;

        let result = await db.insert(this.name, tokenObj);
        result = await db.select(this.name, ['id'], tokenObj);

        if (result.length !== 0) {
            tokenObj.setId(result[0].id);
            return tokenObj;
        }
        return this.msgNoCreateToken;
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
