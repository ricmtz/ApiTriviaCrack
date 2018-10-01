const { EmailsORM, FriendsORM } = require('../orm');

class User {
    constructor({
        id, nickname, password, principalEmail, userType,
        score, avatar, emails, friends, deleted,
    }) {
        this.id = id;
        this.nickname = nickname;
        this.password = password;
        this.principalEmail = principalEmail;
        this.userType = userType;
        this.score = score;
        this.avatar = avatar;
        this.email = EmailsORM.get(emails);
        this.friends = FriendsORM.get(friends);
        this.deleted = deleted;
    }

    getId() {
        return this.id;
    }

    getNickname() {
        return this.nickname;
    }

    getPassword() {
        return this.password;
    }

    getPrincipalEmail() {
        return this.principalEmail;
    }

    getUserType() {
        return this.userType;
    }

    getCurrentPoints() {
        return this.score;
    }

    getDeleted() {
        return this.deleted;
    }

    setNickname(nickname) {
        this.nickname = nickname;
    }

    setPassword(password) {
        this.password = password;
    }

    setPrincipalEmail(email) {
        this.principalEmail = email;
    }

    setUserType(type) {
        this.userType = type;
    }

    setScore(score) {
        this.score = score;
    }

    setDeleted(deleted) {
        this.deleted = deleted;
    }
}

module.exports = User;
