const { db } = require('../db');
const UsersORM = require('./users');
const { filters } = require('../filters');

class Emails {
    constructor() {
        this.name = 'emails';
        this.msgExistEmail = 'This email already exists';
        this.msgNoExistEmail = 'This email not exists';
    }

    async getAll(nicknameUser, conditions) {
        const user = await UsersORM.getByNickname(nicknameUser)
            .catch(err => Promise.reject(err));
        let result = null;
        await db.selectPaged(this.name,
            { userid: user.getId(), ...this.getFilters(conditions) }, [], conditions.page)
            .then((res) => { result = res; })
            .catch(err => Promise.reject(err));
        await this.appendValuesEmails(result)
            .catch(err => Promise.reject(err));
        return result;
    }

    async create(nickname, email) {
        const user = await UsersORM.getByNickname(nickname)
            .catch(err => Promise.reject(err));
        await this.existsAttribsEmail(email)
            .catch(err => Promise.reject(err));
        const newEmail = { userid: user.getId(), email };
        await db.insert(this.name, newEmail, 'id')
            .then((res) => { newEmail.id = res; })
            .catch(err => Promise.reject(err));
        await this.appendValuesEmail(newEmail)
            .catch(err => Promise.reject(err));
        return newEmail;
    }

    async update(nickname, oldEmail, newEmail) {
        const user = await UsersORM.getByNickname(nickname)
            .catch(err => Promise.reject(err));
        await this.existsAttribsEmail(newEmail)
            .catch(err => Promise.reject(err));
        const conditions = { userid: user.getId(), email: oldEmail };
        await db.update(this.name, { email: newEmail }, conditions)
            .catch(err => Promise.reject(err));
    }

    async delete(nickname, email) {
        const user = await UsersORM.getByNickname(nickname)
            .catch(err => Promise.reject(err));
        await db.exists(this.name, { email })
            .catch(() => Promise.reject(new Error(this.msgNoExistEmail)));
        await db.delete(this.name, { userid: user.getId(), email })
            .catch(err => Promise.reject(err));
    }

    async existsAttribsEmail(email) {
        const duplicateMail = await db.exists(this.name, { email })
            .catch(() => { });
        const duplicateMailUsr = await db.exists(this.name, { email })
            .catch(() => { });
        if (duplicateMail || duplicateMailUsr) {
            return Promise.reject(new Error(this.msgExistEmail));
        }
        return null;
    }

    async appendValuesEmail(email) {
        await UsersORM.get(email.userid)
            .then((res) => { email.user = res.getNickname(); })
            .catch(err => Promise.reject(err));
        delete email.userid;
    }

    async appendValuesEmails(emails) {
        if (!Array.isArray(emails)) {
            await this.appendValuesEmail(emails)
                .catch(err => Promise.reject(err));
        } else {
            const promises = [];
            for (let i = 0; i < emails.length; i += 1) {
                promises.push(this.appendValuesEmail(emails[i]));
            }
            await Promise.all(promises)
                .catch(err => Promise.reject(err));
        }
    }

    getFilters(cond) {
        const result = [];
        if (cond.email) {
            result.email = filters.strFilter('email', cond.email);
        }
        return result;
    }
}

module.exports = new Emails();
