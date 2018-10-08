const { db } = require('../db');
const { Email, User } = require('../models');

class Emails {
    constructor() {
        this.nombre = 'emails';
    }

    async getAll(nicknameUser) {
        let conditions = { nickname: nicknameUser, deleted: false };
        const userResult = await db.select('users', ['id', 'email'], conditions);
        if (userResult.length !== 0) {
            const user = new User(userResult[0]);
            conditions = { userid: user.getId(), deleted: false };
            const result = await db.select(this.nombre, ['email'], conditions);
            if (result.length !== 0) {
                user.setEmails(result);
                return user;
            }
            return result;
        }
        return userResult;
    }
}

module.exports = new Emails();
