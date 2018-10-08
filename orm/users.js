const { db } = require('../db');
const { User } = require('../models');

class Users {
    constructor() {
        this.name = 'users';
        this.emails = 'emails';
    }

    async getAll() {
        const result = await db.select(this.name);
        if (result.length === 0) return result;
        const response = [];
        result.forEach((row) => {
            response.push(new User(row));
        });
        return response;
    }

    async get(idUser) {
        const data = { id: idUser };
        const result = db.select(this.name, [], data);
        return result.length !== 0 ? new User(result[0]) : result;
    }

    async getNickname(nicknameUser) {
        const data = { nickname: nicknameUser };
        const result = await db.select(this.name, [], data);
        return result.length !== 0 ? new User(result[0]) : result;
    }

    async create(data) {
        const user = new User(data);
        let result = await db.insert(this.name, user);
        result = await db.select(this.name, ['id'], user);
        if (result.length !== 0) {
            return user.setId(result[0]);
        }
        return result;
    }

    async update(nicknameUser, data) {
        const user = new User(data);
        let result = await db.update(this.name, user, { nickname: nicknameUser });
        result = await db.select(this.name, ['id'], data);
        return result;
    }

    async delete(nicknameUser) {
        const data = { deleted: true };
        let result = await db.update(this.name, data, { nickname: nicknameUser });
        result = await db.select(this.name, ['id'], data);
        return result;
    }

    async getEmails(nicknameUser) {
        let conditions = { nickname: nicknameUser };
        const userResult = await db.select(this.name, ['id', 'email'], conditions);
        if (userResult.length !== 0) {
            const user = new User(userResult[0]);
            conditions = { userid: user.getId() };
            const result = await db.select(this.emails, ['email', 'deleted'], conditions);
            if (result.length !== 0) {
                user.setEmails(result);
                return user;
            }
            return result;
        }
        return userResult;
    }

    async addEmail({ nicknameUser, emailUser }) {
        let conditions = { nickname: nicknameUser };
        let result = await db.select(this.name, ['id'], conditions);
        if (result.length !== 0) {
            const user = new User(result[0]);
            conditions = { userid: user.getId(), email: emailUser };
            result = await db.insert(this.emails, conditions);
            result = await db.select(this.emails, ['email'], conditions);
        }
        return result;
    }

    async updateEmail({ nicknameUser, emailUser }, newEmail) {
        let conditions = { nickname: nicknameUser };
        let result = await db.select(this.name, ['id'], conditions);
        if (result.length !== 0) {
            const user = new User(result[0]);
            conditions = { userid: user.getId(), email: emailUser };
            result = await db.update(this.emails, { email: newEmail }, conditions);
            conditions = { userid: user.getId(), email: newEmail };
            result = await db.select(this.emails, ['email'], conditions);
        }
        return result;
    }

    async deleteEmail({ nicknameUser, emailUser }) {
        let conditions = { nickname: nicknameUser };
        let result = await db.select(this.name, ['id'], conditions);
        if (result.length !== 0) {
            const user = new User(result[0]);
            conditions = { userid: user.getId(), email: emailUser };
            result = await db.update(this.emails, { deleted: true }, conditions);
            conditions = { userid: user.getId(), deleted: true };
            result = await db.select(this.emails, ['email'], conditions);
        }
        return result;
    }
}

module.exports = new Users();
