const { db } = require('../db');
const { User } = require('../models');
const { Codes } = require('../resCodes');
const { filters } = require('../filters');

class Users {
    constructor() {
        this.name = 'users';
        this.emails = 'emails';
        this.friends = 'friends';
        this.msgNoUser = 'This user not exist';
        this.msgNoCreateUser = 'Dont create user';
        this.msgExistNickname = 'This nickname already exists';
        this.msgExistEmail = 'This email already exists';
        this.msgNoExistEmail = 'This email not exists';
        this.msgSameUser = 'It is the same user';
        this.msgFriendExist = 'This friendship already exists';
        this.msgNoFriendExist = 'This friendship not exists';
    }

    async getAll(conditions) {
        let result = null;
        await db.selectPaged(this.name, this.getFilters(conditions), [],
            conditions.page, conditions.random)
            .then((res) => { result = res; })
            .catch(err => Promise.reject(Codes.resNotFound(err.message)));
        result.result = this.processResult(result.result);
        return result;
    }

    async get(idUser) {
        let result = null;
        await db.selectNonDel(this.name, { id: idUser })
            .then((res) => { result = this.processResult(res); })
            .catch(() => Promise.reject(Codes.resNotFound(this.msgNoUser)));
        return result;
    }

    async create(data) {
        const user = new User(data);
        this.setDefaultValues(user);
        await this.existsAttribs(user)
            .catch(err => Promise.reject(err));
        await db.insert(this.name, user, 'id')
            .then((res) => { user.setId(res); })
            .catch(err => Promise.reject(err));
        return user;
    }

    async update(nicknameUser, data) {
        await db.selectNonDel(this.name, { nickname: nicknameUser }, ['id'])
            .catch(() => Promise.reject(new Error(this.msgNoUser)));
        const user = new User(data);
        await this.existsAttribs(user)
            .catch(err => Promise.reject(err));
        await db.update(this.name, user, { nickname: nicknameUser, deleted: false })
            .catch(err => Promise.reject(err));
    }

    async delete(nicknameUser) {
        await db.selectNonDel(this.name, { nickname: nicknameUser }, ['id'])
            .catch(() => Promise.reject(new Error(this.msgNoUser)));
        await db.delete(this.name, { nickname: nicknameUser })
            .catch(err => Promise.reject(err));
    }

    async getByNickname(nicknameUser) {
        let result = null;
        await db.selectNonDel(this.name, { nickname: nicknameUser })
            .then((res) => { result = this.processResult(res); })
            .catch(() => Promise.reject(new Error(this.msgNoUser)));
        return result;
    }

    processResult(rows) {
        if (!rows) {
            return null;
        }
        if (!Array.isArray(rows)) {
            return new User(rows);
        }
        if (rows.length === 1) {
            return new User(rows[0]);
        }
        const usersList = [];
        rows.forEach((row) => { usersList.push(new User(row)); });
        return usersList;
    }

    async existsAttribs(user) {
        let error = null;
        error = await db.exists(this.name, { nickname: user.getNickname() })
            .catch(() => { });
        if (error) {
            return Promise.reject(new Error(this.msgExistNickname));
        }
        await this.existsEmail(user.getEmail())
            .catch(err => Promise.reject(err));
        return null;
    }

    async existsEmail(emailUser) {
        let error = null;
        error = await db.exists(this.name, { email: emailUser })
            .catch(() => { });
        if (error) {
            return Promise.reject(new Error(this.msgExistEmail));
        }
        error = await db.exists(this.emails, { email: emailUser })
            .catch(() => { });
        if (error) {
            return Promise.reject(new Error(this.msgExistEmail));
        }
        return null;
    }

    getFilters(cond) {
        const result = [];
        if (cond.nickname) {
            result.nickname = filters.strFilter('nickname', cond.nickname);
        }
        if (cond.email) {
            result.email = filters.strFilter('email', cond.email);
        }
        if (typeof (cond.admin) !== 'undefined') {
            result.admin = cond.admin;
        }
        if (cond.scoreMin) {
            result.scoreMin = filters.minNumber('score', cond.scoreMin);
        }
        if (cond.scoreMax) {
            result.scoreMax = filters.maxNumber('score', cond.scoreMax);
        }
        return result;
    }

    /**
     * This function set the default valuest to the attribs
     * admin, score, avatar, lastlogin, deleted and verified
     * for a user.
     * @param {Object} req Express request object.
     */
    setDefaultValues(user) {
        user.setAdmin(false);
        user.setScore(0);
        user.setAvatar('default.png');
        user.setLastLogin(new Date().toISOString());
        user.setDeleted(false);
        user.setVerified(false);
    }
}

module.exports = new Users();
