const { db } = require('../db');
const UsersORM = require('./users');

class Friends {
    constructor() {
        this.name = 'friends';
        this.msgSameUser = 'It is the same user';
        this.msgFriendExist = 'This friendship already exists';
        this.msgNoFriendExist = 'This friendship not exists';
    }

    async getFriends(nickname) {
        const user = await UsersORM.getByNickname(nickname)
            .catch(err => Promise.reject(err));
        let result = null;
        await db.selectNonDel(this.name, { user1: user.getId() }, [])
            .then((res) => { result = res; })
            .catch(err => Promise.reject(err));
        await db.selectNonDel(this.name, { user2: user.getId() }, [])
            .then((res) => { result.push(...res); })
            .catch(err => Promise.reject(err));
        await this.appendValuesFriends(result)
            .catch(err => Promise.reject(err));
        return result;
    }

    async addFriend(nicknameUser, nicknameFriend, date) {
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
        return friendship;
    }

    async deleteFriend(nicknameUser, nicknameFriend) {
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

    async appendValuesFriend(friend) {
        await this.get(friend.user1)
            .then((res) => { friend.user1 = res.getNickname(); })
            .catch(err => Promise.reject(err));
        await this.get(friend.user2)
            .then((res) => { friend.user2 = res.getNickname(); })
            .catch(err => Promise.reject(err));
    }

    async appendValuesFriends(friends) {
        if (!Array.isArray(friends)) {
            await this.appendValuesFriend(friends)
                .catch(err => Promise.reject(err));
        } else {
            const promises = [];
            for (let i = 0; i < friends.length; i += 1) {
                promises.push(this.appendValuesFriend(friends[i]));
            }
            await Promise.all(promises)
                .catch(err => Promise.reject(err));
        }
    }
}

module.exports = new Friends();
