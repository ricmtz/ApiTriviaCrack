const db = require('../DB');

class User {
    /**
     * @param {Number} id
     * @param {String} nickname
     * @param {String} password
     * @param {String} principalEmail
     * @param {String} uType
     * @param {number} score
     */
    constructor(id, nickname, password, principalEmail, uType, score) {
        this.id = id;
        this.nickname = nickname;
        this.password = password;
        this.principalEmail = principalEmail;
        this.userType = uType;
        this.score = score;
    }

    save() {
        db.insert('Users', this);
    }

    get id() {
        return this.id;
    }

    get nickname() {
        return this.nickname;
    }

    get password() {
        return this.password;
    }

    get principalEmail() {
        return this.principalEmail;
    }

    get userType() {
        return this.userType;
    }

    get currentPoints() {
        return this.score;
    }

    set nickname(nickname) {
        this.nickname = nickname;
    }

    set password(password) {
        this.password = password;
    }

    set principalEmail(email) {
        this.principalEmail = email;
    }

    set userType(type) {
        this.userType = type;
    }

    set escore(score) {
        this.score = score;
    }
}

module.exports = User;
