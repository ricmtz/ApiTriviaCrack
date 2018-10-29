const { db } = require('../db');
const { Token } = require('../models');

class Tokens {
    constructor() {
        this.name = 'tokens';
        this.msgNoToken = 'Token not found';
        this.msgNoCreateToken = 'Could not create token';
    }

    async get(searchToken) {
        let result = null;
        await db.select(this.name, { token: searchToken, status: '1' })
            .then((res) => { result = this.processResult(res); })
            .catch(err => Promise.reject(err));
        return result;
    }

    async getLastByUserId(userId) {
        let result = null;
        await db.selectLast(this.name, { userid: userId }, [], 'createdat')
            .then((res) => { result = this.processResult(res); })
            .catch(err => Promise.reject(err));
        return result;
    }

    async create(data) {
        const tokenObj = new Token(data);
        await db.insert(this.name, tokenObj, 'id')
            .then((res) => { tokenObj.setId(res); })
            .catch(err => Promise.reject(err));
        return tokenObj;
    }

    async updateStatus(idToken, newStatus) {
        await db.select(this.name, { id: idToken }, ['id'])
            .catch(() => Promise.reject(new Error(this.msgNoUser)));
        await db.update(this.name, { status: newStatus }, { id: idToken })
            .catch(err => Promise.reject(err));
        return true;
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

        const tokensList = [];
        rows.forEach((row) => { tokensList.push(new Token(row)); });
        return tokensList;
    }
}

module.exports = new Tokens();
