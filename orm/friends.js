const { db } = require('../db');
const UsersORM = require('./users');

class Friends {
    constructor() {
        this.name = 'friends';
        this.msgSameUser = 'It is the same user';
        this.msgFriendExist = 'This friendship already exists';
        this.msgNoFriendExist = 'This friendship not exists';
    }

    async getAll(nickname, filters) {
        const user = await UsersORM.getByNickname(nickname)
            .catch(err => Promise.reject(err));
        let result = [];
        let filtersObj = await this.getFilters(filters)
            .catch(err => Promise.reject(err));
        await db.selectNonDel(this.name, { user1: user.getId(), ...filtersObj }, [])
            .then((res) => { result = res; })
            .catch(() => {});
        filtersObj = await this.getInverseFilters(filters)
            .catch(err => Promise.reject(err));
        await db.selectNonDel(this.name, { user2: user.getId(), ...filtersObj }, [])
            .then((res) => { result.push(...res); })
            .catch(() => {});
        await this.appendValuesFriends(result, user.getId())
            .catch(err => Promise.reject(err));
        return result;
    }

    async create(nicknameUser, nicknameFriend, date) {
        const user1 = await UsersORM.getByNickname(nicknameUser)
            .catch(err => Promise.reject(err));
        const user2 = await UsersORM.getByNickname(nicknameFriend)
            .catch(err => Promise.reject(err));
        if (user1.getId() === user2.getId()) {
            return Promise.reject(new Error(this.msgSameUser));
        }
        await this.notExistFriendship(user1.getId(), user2.getId())
            .catch(err => Promise.reject(err));
        const friendship = { user1: user1.getId(), user2: user2.getId(), friendshipdate: date };
        await db.insert(this.name, friendship, 'id')
            .then((res) => { friendship.id = res; })
            .catch(err => Promise.reject(err));
        await this.appendValuesFriend(friendship)
            .catch(err => Promise.reject(err));
        return friendship;
    }

    async delete(nicknameUser, nicknameFriend) {
        const user1 = await UsersORM.getByNickname(nicknameUser)
            .catch(err => Promise.reject(err));
        const user2 = await UsersORM.getByNickname(nicknameFriend)
            .catch(err => Promise.reject(err));
        await this.existFriendship(user1.getId(), user2.getId())
            .catch(err => Promise.reject(err));
        await db.delete(this.name, { user1: user1.getId(), user2: user2.getId() })
            .catch(err => Promise.reject(err));
    }

    async notExistFriendship(user1, user2) {
        const exist = await db.exists(this.name, { user1, user2 })
            .catch(() => { });
        if (exist) {
            return Promise.reject(new Error(this.msgFriendExist));
        }
        return null;
    }

    async existFriendship(user1, user2) {
        const exist = await db.exists(this.name, { user1, user2, deleted: false })
            .catch(() => { });
        if (!exist) {
            return Promise.reject(new Error(this.msgNoFriendExist));
        }
        return null;
    }

    async appendValuesFriend(friend, userId) {
        await UsersORM.get(friend.user1)
            .then((res) => {
                friend.user1 = res.getNickname();
                friend.avatar = friend.user1 !== userId ? res.getAvatar() : null;
            })
            .catch(err => Promise.reject(err));
        await UsersORM.get(friend.user2)
            .then((res) => {
                friend.user2 = res.getNickname();
                friend.avatar = friend.user2 !== userId ? res.getAvatar() : friend.avatar;
            })
            .catch(err => Promise.reject(err));
    }

    async appendValuesFriends(friends, userId) {
        if (!friends) {
            return;
        }
        if (!Array.isArray(friends)) {
            await this.appendValuesFriend(friends, userId)
                .catch(err => Promise.reject(err));
        } else {
            const promises = [];
            for (let i = 0; i < friends.length; i += 1) {
                promises.push(this.appendValuesFriend(friends[i], userId));
            }
            await Promise.all(promises)
                .catch(err => Promise.reject(err));
        }
    }

    async getFilters(query) {
        const result = [];
        if (query.user2) {
            await UsersORM.getByNickname(query.user2)
                .then((usr) => { result.user2 = usr.getId(); });
        }
        return result;
    }

    async getInverseFilters(query) {
        const result = [];
        if (query.user2) {
            await UsersORM.getByNickname(query.user2)
                .then((usr) => { result.user1 = usr.getId(); });
        }
        return result;
    }
}

module.exports = new Friends();
