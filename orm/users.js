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
            .catch(() => {});
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
            .catch(() => {});
        if (error) {
            return Promise.reject(new Error(this.msgExistEmail));
        }
        error = await db.exists(this.emails, { email: emailUser })
            .catch(() => {});
        if (error) {
            console.log('emails');
            return Promise.reject(new Error(this.msgExistEmail));
        }
        return null;
    }

    async getEmails(nicknameUser) {
        let user = null;
        await this.getByNickname(nicknameUser)
            .then((usr) => { user = usr; })
            .catch(() => Promise.reject(new Error(this.msgNoUser)));
        const conditions = { userid: user.getId(), deleted: false };
        await db.selectNonDel(this.emails, conditions, ['email'])
            .then((res) => { user.setEmails(res); })
            .catch(err => Promise.reject(err));
        return user;
    }

    async addEmail({ nicknameUser, emailUser }) {
        let user = null;
        await this.getByNickname(nicknameUser)
            .then((usr) => { user = usr; })
            .catch(() => Promise.reject(new Error(this.msgNoUser)));
        await this.existsEmail(emailUser)
            .catch(err => Promise.reject(err));
        let idEmail = null;
        await db.insert(this.emails,
            { userid: user.getId(), email: emailUser }, 'id')
            .then((res) => { idEmail = res; })
            .catch(err => Promise.reject(err));
        return idEmail;
    }

    async updateEmail({ nicknameUser, emailUser, newEmail }) {
        await this.getByNickname(nicknameUser)
            .catch(() => Promise.reject(new Error(this.msgNoUser)));
        await this.existsEmail(newEmail)
            .catch(err => Promise.reject(err));
        await db.update(this.emails, { email: newEmail },
            { email: emailUser, deleted: false })
            .catch(err => Promise.reject(err));
    }

    async deleteEmail({ nicknameUser, emailUser }) {
        await this.getByNickname(nicknameUser)
            .catch(() => Promise.reject(new Error(this.msgNoUser)));
        await db.delete(this.emails, { email: emailUser })
            .catch(err => Promise.reject(err));
    }

    async getFriends(nicknameUser) {
        let friends = [];
        let user = null;
        await this.getByNickname(nicknameUser)
            .then((usr) => { user = usr; })
            .catch(() => Promise.reject(new Error(this.msgNoUser)));
        friends = await this.getFriendsPartial(1, user.getId(), friends);
        friends = await this.getFriendsPartial(2, user.getId(), friends);
        user.setFriends(friends);
        return user;
    }

    async getFriendsPartial(user, idUser, friends) {
        let cond = { user1: idUser, deleted: false };
        let col = ['user2', 'friendshipdate'];
        if (user === 2) {
            cond = { user2: idUser, deleted: false };
            col = ['user1', 'friendshipdate'];
        }
        await db.select(this.friends, cond, col)
            .then(async (res) => {
                for (let i = 0; i < res.length; i += 1) {
                    let nicknameFr = null;
                    let us = null;
                    if (user === 1) {
                        us = res[i].user2;
                    } else {
                        us = res[i].user1;
                    }
                    await db.select(this.name, { id: us }, ['nickname'])
                        .then((fr) => {  nicknameFr = fr[0].nickname; })
                        .catch(() => {});
                    if (nicknameFr !== null) {
                        friends.push({
                            nickname: nicknameFr,
                            date: res[i].friendshipdate,
                        });
                    }
                }
            })
            .catch(() => {});
        return friends;
    }

    async existFriendship(userid1, userid2) {
        let error = null;
        let data = { user1: userid1, user2: userid2 };
        error = await db.exists(this.friends, data)
            .catch(() => {});
        if (error) {
            return error;
        }
        data = { user1: userid2, user2: userid1 };
        error = await db.exists(this.friends, data)
            .catch(() => {});
        if (error) {
            return error;
        }
        return null;
    }

    async addFriend({ nicknameUser, nicknameFriend, date }) {
        let user1 = null;
        await this.getByNickname(nicknameUser)
            .then((usr) => { user1 = usr; })
            .catch(() => Promise.reject(new Error(this.msgNoUser)));
        let user2 = null;
        await this.getByNickname(nicknameFriend)
            .then((usr) => { user2 = usr; })
            .catch(() => Promise.reject(new Error(this.msgNoUser)));
        const friend = await this.existFriendship(user1.getId(), user2.getId())
            .catch(() => {});
        if (friend !== null) {
            if (!friend[0].deleted) {
                return Promise.reject(new Error(this.msgFriendExist));
            }
            await db.update(this.friends, { deleted: false }, { id: friend[0].id })
                .catch(err => Promise.reject(err));
            return friend[0].id;
        } else {
            let idFriends = null;
            await db.insert(this.friends,
                { user1: user1.getId(), user2: user2.getId(), friendshipdate: date }, 'id')
                .then((res) => { idFriends = res; })
                .catch(err => Promise.reject(err));
            return idFriends;
        }
    }

    async deleteFriend({ nicknameUser, nicknameFriend }) {
        let user1 = null;
        await this.getByNickname(nicknameUser)
            .then((usr) => { user1 = usr; })
            .catch(() => Promise.reject(new Error(this.msgNoUser)));
        let user2 = null;
        await this.getByNickname(nicknameFriend)
            .then((usr) => { user2 = usr; })
            .catch(() => Promise.reject(new Error(this.msgNoUser)));
        await db.delete(this.friends, { user1: user1.getId(), user2: user2.getId() })
            .catch(() => {});
        await db.delete(this.friends, { user1: user2.getId(), user2: user1.getId() })
            .catch(err => Promise.reject(err));
    }
}

module.exports = new Users();
