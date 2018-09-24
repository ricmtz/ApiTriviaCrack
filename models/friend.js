const db = require('../db');

class Friend {
    constructor(user1, user2, friendshipDate) {
        this.user1 = user1;
        this.user2 = user2;
        this.friendshipDate = friendshipDate;
    }

    save() {
        db.insert(this);
    }
}

module.exports = Friend;
