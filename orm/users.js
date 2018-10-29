const { db } = require('../db');
const { User } = require('../models');

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

    async getAll(pageNum) {
        let result = null;
        await db.selectPaged(this.name, {}, [], pageNum)
            .then((res) => { result = this.processResult(res); })
            .catch(err => Promise.reject(err));
        return result;
    }

    async get(idUser) {
        let result = null;
        await db.selectNonDel(this.name, { id: idUser })
            .then((res) => { result = this.processResult(res); })
            .catch(() => Promise.reject(new Error(this.msgNoUser)));
        return result;
    }

    async create(data) {
        const user = new User(data);
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
        error = await db.exists(this.name, { email: user.getEmail() })
            .catch(() => { });
        if (error) {
            return Promise.reject(new Error(this.msgExistEmail));
        }
        error = await db.exists(this.emails, { email: user.getEmail() })
            .catch(() => { });
        if (error) {
            console.log('emails');
            return Promise.reject(new Error(this.msgExistEmail));
        }
        return null;
    }

    async getEmails(nicknameUser, page) {
        const user = await this.getByNickname(nicknameUser)
            .catch(err => Promise.reject(err));
        let result = null;
        await db.selectPaged(this.emails, { userid: user.getId() }, [], page)
            .then((res) => { result = res; })
            .catch(err => Promise.reject(err));
        return result;
    }

    async addEmail(nickname, email) {
        const user = await this.getByNickname(nickname)
            .catch(err => Promise.reject(err));
        await this.existsAttribsEmail(email)
            .catch(err => Promise.reject(err));
        const newEmail = { userid: user.getId(), email };
        await db.insert(this.emails, newEmail, 'id')
            .then((res) => { newEmail.id = res; })
            .catch(err => Promise.reject(err));
        return newEmail;
    }

    async updateEmail(nickname, oldEmail, newEmail) {
        const user = await this.getByNickname(nickname)
            .catch(err => Promise.reject(err));
        await this.existsAttribsEmail(newEmail)
            .catch(err => Promise.reject(err));
        const conditions = { userid: user.getId(), email: oldEmail };
        await db.update(this.emails, { email: newEmail }, conditions)
            .catch(err => Promise.reject(err));
    }

    async deleteEmail(nickname, email) {
        const user = await this.getByNickname(nickname)
            .catch(err => Promise.reject(err));
        await db.exists(this.emails, { email })
            .catch(() => Promise.reject(new Error(this.msgNoExistEmail)));
        await db.delete(this.emails, { userid: user.getId(), email })
            .catch(err => Promise.reject(err));
    }

    async existsAttribsEmail(email) {
        const duplicateMail = await db.exists(this.emails, { email })
            .catch(() => { });
        const duplicateMailUsr = await db.exists(this.name, { email })
            .catch(() => { });
        if (duplicateMail || duplicateMailUsr) {
            return Promise.reject(new Error(this.msgExistEmail));
        }
        return null;
    }

    async getFriends(nickname) {
        const user = await this.getByNickname(nickname)
            .catch(err => Promise.reject(err));
        let result = null;
        await db.selectNonDel(this.friends, { user1: user.getId() }, [])
            .then((res) => { result = res; })
            .catch(err => Promise.reject(err));
        await db.selectNonDel(this.friends, { user2: user.getId() }, [])
            .then((res) => { result.push(...res); })
            .catch(err => Promise.reject(err));
        return result;
    }

    async addFriend(nicknameUser, nicknameFriend, date) {
        const user1 = await this.getByNickname(nicknameUser)
            .catch(err => Promise.reject(err));
        const user2 = await this.getByNickname(nicknameFriend)
            .catch(err => Promise.reject(err));
        if (user1.getId() === user2.getId()) {
            return Promise.reject(new Error(this.msgSameUser));
        }
        await this.notExistFriendship(user1.getId(), user2.getId())
            .catch(err => Promise.reject(err));
        const friendship = { user1: user1.getId(), user2: user2.getId(), friendshipdate: date };
        await db.insert(this.friends, friendship, 'id')
            .then((res) => { friendship.id = res; })
            .catch(err => Promise.reject(err));
        return friendship;
    }

    async deleteFriend(nicknameUser, nicknameFriend) {
        const user1 = await this.getByNickname(nicknameUser)
            .catch(err => Promise.reject(err));
        const user2 = await this.getByNickname(nicknameFriend)
            .catch(err => Promise.reject(err));
        await this.existFriendship(user1.getId(), user2.getId())
            .catch(err => Promise.reject(err));
        await db.delete(this.friends, { user1: user1.getId(), user2: user2.getId() })
            .catch(err => Promise.reject(err));
    }

    async notExistFriendship(user1, user2) {
        const exist = await db.exists(this.friends, { user1, user2 })
            .catch(() => { });
        if (exist) {
            return Promise.reject(new Error(this.msgFriendExist));
        }
        return null;
    }

    async existFriendship(user1, user2) {
        const exist = await db.exists(this.friends, { user1, user2, deleted: false })
            .catch(() => { });
        if (!exist) {
            return Promise.reject(new Error(this.msgNoFriendExist));
        }
        return null;
    }
}

module.exports = new Users();
