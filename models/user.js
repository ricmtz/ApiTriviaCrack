const { EmailsORM, FriendsORM } = require('../orm');

class User {
    constructor({
        id, nickname, password, email, admin,
        score, avatar, emails = [], friends = [],
        deleted, lastlogin,
    }) {
        this.setId(id);
        this.nickname = nickname;
        this.password = password;
        this.email = email;
        this.setAdmin(admin);
        this.setScore(score);
        this.setAvatar(avatar);
        this.setEmails(emails);
        this.setFriends(friends);
        this.setEmails(emails);
        this.setFriends(friends);
        this.setDeleted(deleted);
        this.setLastlogin(lastlogin);
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

    getEmail() {
        return this.principalEmail;
    }

    getAmdin() {
        return this.userType;
    }

    getScore() {
        return this.score;
    }

    getAvatar() {
        return this.avatar;
    }

    getDeleted() {
        return this.deleted;
    }

    getLastlogin() {
        return this.lastlogin;
    }

    setId(id) {
        if (id !== undefined) this.id = id;
    }

    setNickname(nickname) {
        this.nickname = nickname;
    }

    setPassword(password) {
        this.password = password;
    }

    setEmail(email) {
        this.email = email;
    }

    setAdmin(admin) {
        if (admin !== undefined) this.admin = admin;
    }

    setScore(score) {
        if (score !== undefined) this.score = score;
    }

    setAvatar(avatar) {
        if (avatar !== undefined) this.avatar = avatar;
    }

    setDeleted(deleted) {
        if (deleted !== undefined) this.deleted = deleted;
    }

    setLastlogin(lastlogin) {
        if (lastlogin !== undefined) this.lastlogin = lastlogin;
    }

    setEmails(emails) {
        if (this.id !== undefined) {
            this.emails = EmailsORM.get(emails);
        }
    }

    setFriends(friends) {
        if (this.id !== undefined) this.friends = FriendsORM.get(friends);
    }
}

module.exports = User;
