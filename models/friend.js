const { UsersORM } = require('../orm');

class Friend {
    constructor({ idUser1, idUser2, friendshipDate }) {
        this.user1 = UsersORM.getNickname(idUser1);
        this.user2 = UsersORM.getNickname(idUser2);
        this.friendshipDate = friendshipDate;
    }

    getFriendshipDate() {
        return this.friendshipDate;
    }

    getFriend(user) {
        return user === this.user1 ? this.user2 : this.user1;
    }

    setUser1(user) {
        this.user1 = user;
    }

    setUser2(user) {
        this.user2 = user;
    }

    setFriendshipDate(date) {
        this.friendshipDate = date;
    }
}

module.exports = Friend;
