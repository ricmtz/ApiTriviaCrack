const db = require('../DB');

class Friend {
    constructor(user1, user2, friendshipDate) {
        this.user1 = user1;
        this.user2 = user2;
        this.friendshipDate = friendshipDate;
    }

    save() {
        db.insert(this);
    }

    get friendshipDate() {
        return this.friendshipDate;
    }

    set user1(user) {
        this.user1 = user;
    }

    set user2(user) {
        this.user2 = user;
    }

    set friendshipDate(date) {
        this.friendshipDate = date;
    }
}

module.exports = Friend;
