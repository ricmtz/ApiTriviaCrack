const db = require('../db');

class Friend {
    constructor(user1, user2, friendshpDate) {
        this.user1 = user1;
        this.user2 = user2;
        this.friendshpDate = friendshpDate;
    }

    save() {
        db.insert(this);
    }
}

module.exports = Friend;
