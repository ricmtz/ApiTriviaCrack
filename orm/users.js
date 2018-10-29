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
        error = await db.exists(this.name, { email: user.getEmail() })
            .catch(() => { });
        if (error) {
            return Promise.reject(new Error(this.msgExistEmail));
        }
        error = await db.exists(this.emails, { email: user.getEmail() })
            .catch(() => { });
        if (error) {
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

    async getFriends(nicknameUser) {
        const conditions = { 'u1.nickname': nicknameUser, 'u2.nickname': nicknameUser };
        const columns = [
            { column: 'u1.nickname', as: 'friend1' },
            { column: 'u2.nickname', as: 'friend2' },
            { column: 'friends.friendshipdate', as: 'date' },
        ];
        const join = [
            {
                type: 'JOIN', table: 'users', as: 'u1', condition: 'u1.id = friends.user1',
            },
            {
                type: 'JOIN', table: 'users', as: 'u2', condition: 'u2.id = friends.user2',
            },
        ];
        const result = await db.select(this.friends, columns, conditions, ' OR ', join);
        return result;
    }

    async existFriendship(userid1, userid2) {
        let data = { user1: userid1, user2: userid2 };
        const exist1 = await this.existData(this.friends, data);
        data = { user1: userid2, user2: userid1 };
        const exist2 = await this.existData(this.friends, data);
        return (exist1 === true || exist2 === true);
    }

    async addFriend(nicknameUser, { nicknameFriend, date }) {
        let user1 = await this.getUser(nicknameUser, ['id']);
        let user2 = await this.getUser(nicknameFriend, ['id']);
        if (user1.length === 0 || user2.length === 0) return this.msgNoUser;
        user1 = new User(user1[0]);
        user2 = new User(user2[0]);
        if (user1.getId() === user2.getId()) return this.msgSameUser;
        const exist = await this.existFriendship(user1.getId(), user2.getId());
        if (exist) return this.msgFriendExist;
        let data = { user1: user1.getId(), user2: user2.getId(), friendshipdate: date };
        let result = await db.insert(this.friends, data);
        data = { user1: user1.getId(), user2: user2.getId(), friendshipdate: date };
        result = await db.select(this.friends, ['friendshipdate'], data);
        return (result.length === 0) ? result : result[0];
    }

    async deleteFriend({ nicknameUser, nicknameFriend }) {
        let user1 = await this.getUser(nicknameUser, ['id']);
        let user2 = await this.getUser(nicknameFriend, ['id']);
        if (user1.length === 0 || user2.length === 0) return this.msgNoUser;
        user1 = new User(user1[0]);
        user2 = new User(user2[0]);
        const exist = await this.existFriendship(user1.getId(), user2.getId());
        if (!exist) return this.msgNoFriendExist;
        let conditions = { user1: user1.getId(), user2: user2.getId() };
        let result = await db.delete(this.friends, conditions);
        conditions = { user1: user2.getId(), user2: user1.getId() };
        result = await db.delete(this.friends, conditions);
        return result;
    }
}

module.exports = new Users();
