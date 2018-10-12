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

    async getAll() {
        const data = ['id', 'nickname', 'password', 'email', 'admin',
            'score', 'avatar', 'lastlogin'];
        const condition = { deleted: false };
        const result = await db.select(this.name, data, condition);
        if (result.length === 0) return result;
        const response = [];
        result.forEach((row) => {
            response.push(new User(row));
        });
        return response;
    }

    async get(idUser) {
        const data = ['id', 'nickname', 'password', 'email', 'admin',
            'score', 'avatar', 'lastlogin'];
        const condition = { id: idUser, deleted: false };
        const result = await db.select(this.name, data, condition);
        return result.length !== 0 ? new User(result[0]) : this.msgNoUser;
    }

    async getNickname(nicknameUser) {
        const data = ['id', 'nickname', 'password', 'email', 'admin',
            'score', 'avatar', 'lastlogin'];
        const result = await this.getUser(nicknameUser, data);
        return result.length !== 0 ? new User(result[0]) : this.msgNoUser;
    }

    async getUser(nicknameUser, data) {
        const condition = { nickname: nicknameUser, deleted: false };
        const result = await db.select(this.name, data, condition);
        return result;
    }

    async existData(table, condition) {
        const result = await db.select(table, ['count(*)'], condition);
        return (result[0].count != 0);
    }

    async create(data) {
        let exist;
        const user = new User(data);
        exist = await this.existData(this.name, { nickname: user.getNickname() });
        if (exist) return this.msgExistNickname;
        exist = await this.existData(this.name, { email: user.getEmail() });
        if (exist) return this.msgExistEmail;
        exist = await this.existData(this.emails, { email: user.getEmail() });
        if (exist) return this.msgExistEmail;
        let result = await db.insert(this.name, user);
        result = await db.select(this.name, ['id'], { nickname: user.getNickname() });
        if (result.length === 0) return this.msgNoCreateUser;
        user.setId(result[0].id);
        return user;
    }

    async update(nicknameUser, data) {
        const resUser = await this.getUser(nicknameUser, ['id']);
        if (resUser.length === 0) return this.msgNoUser;
        const user = new User(data);
        let exist = await this.existData(this.name, { nickname: user.getNickname() });
        if (exist) return this.msgExistNickname;
        exist = await this.existData(this.name, { email: user.getEmail() });
        if (exist) return this.msgExistEmail;
        exist = await this.existData(this.emails, { email: user.getEmail() });
        if (exist) return this.msgExistEmail;
        let result = await db.update(this.name, user, { nickname: nicknameUser });
        result = await db.select(this.name, ['id'], data);
        return (result.length === 0) ? result : user;
    }

    async delete(nicknameUser) {
        const resUser = await this.getUser(nicknameUser, ['id']);
        if (resUser.length === 0) return this.msgNoUser;
        const data = { deleted: true };
        let result = await db.update(this.name, data, { nickname: nicknameUser });
        result = await db.select(this.name, ['id'], data);
        return (result.length === 0) ? result : result[0];
    }

    async getEmails(nicknameUser) {
        const userResult = await this.getUser(nicknameUser, ['id', 'email']);
        if (userResult.length === 0) return this.msgNoUser;
        const user = new User(userResult[0]);
        const conditions = { userid: user.getId(), deleted: false };
        const result = await db.select(this.emails, ['email'], conditions);
        if (result.length !== 0) {
            user.setEmails(result);
            return user;
        }
        return result;
    }

    async addEmail({ nicknameUser, emailUser }) {
        let result = await this.getUser(nicknameUser, ['id', 'email']);
        if (result.length === 0) return this.msgNoUser;
        const user = new User(result[0]);
        let exist = await this.existData(this.name, { email: emailUser });
        if (exist) return this.msgExistEmail;
        exist = await this.existData(this.emails, { email: emailUser });
        if (exist) return this.msgExistEmail;
        const conditions = { userid: user.getId(), email: emailUser };
        result = await db.insert(this.emails, conditions);
        result = await db.select(this.emails, ['email'], conditions);
        return result;
    }

    async updateEmail({ nicknameUser, emailUser }, newEmail) {
        let result = await this.getUser(nicknameUser, ['id', 'email']);
        if (result.length === 0) return 'This user not exist';
        const user = new User(result[0]);
        let exist = await this.existData(this.name, { email: newEmail });
        if (exist) return this.msgExistEmail;
        exist = await this.existData(this.emails, { email: newEmail });
        if (exist) return this.msgExistEmail;
        let conditions = { userid: user.getId(), email: emailUser };
        result = await db.update(this.emails, { email: newEmail }, conditions);
        conditions = { userid: user.getId(), email: newEmail };
        result = await db.select(this.emails, ['email'], conditions);
        return (result.length === 0) ? result : result[0];
    }

    async deleteEmail({ nicknameUser, emailUser }) {
        let conditions = { nickname: nicknameUser };
        let result = await db.select(this.name, ['id'], conditions);
        if (result.length === 0) return this.msgNoUser;
        const user = new User(result[0]);
        const exist = await this.existData(this.emails, { email: emailUser, deleted: false });
        if (!exist) return this.msgNoExistEmail;
        conditions = { userid: user.getId(), email: emailUser };
        result = await db.update(this.emails, { deleted: true }, conditions);
        conditions = { userid: user.getId(), deleted: true };
        result = await db.select(this.emails, ['email'], conditions);
        return (result.length === 0) ? result : result[0];
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
