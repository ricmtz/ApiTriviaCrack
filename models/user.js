const db = require('../db');

class User {
    /**
     * @param {Number} id
     * @param {String} nickname
     * @param {String} password
     * @param {String} email
     * @param {String} uType
     * @param {number} cPoints
     */
    constructor(id, nickname, password, email, uType, cPoints) {
        this.id = id;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
        this.userType = uType;
        this.currentPoints = cPoints;
    }

    save() {
        db.insert(this);
    }

    get id() {
        return this.id;
    }

    get nickname() {
        return this.nickname;
    }

    get email() {
        return this.email;
    }

    get currentPoints() {
        return this.currentPoints;
    }
}

module.exports = User;
