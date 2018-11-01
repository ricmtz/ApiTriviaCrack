// FIXME Todos los métodos deben estar documentados

class User {
    constructor({
        id, nickname, password, email, admin,
        score, avatar, emails, friends,
        deleted, lastlogin, verified,
    }) {
        this.setId(id);
        this.setNickname(nickname);
        this.setPassword(password);
        this.setEmail(email);
        this.setAdmin(admin);
        this.setScore(score);
        this.setAvatar(avatar);
        this.setEmails(emails);
        this.setFriends(friends);
        this.setDeleted(deleted);
        this.setLastlogin(lastlogin);
        this.setVerified(verified);
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
        return this.email;
    }

    getAdmin() {
        return this.admin;
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

    getVerified() {
        return this.verified;
    }

    setId(id) {
        if (id !== undefined) {
            this.id = id;
        }
    }

    setNickname(nickname) {
        if (nickname !== undefined) {
            this.nickname = nickname;
        }
    }

    setPassword(password) {
        if (password !== undefined) {
            this.password = password;
        }
    }

    setEmail(email) {
        if (email !== undefined) {
            this.email = email;
        }
    }

    setAdmin(admin) {
        if (admin !== undefined) {
            this.admin = admin;
        }
    }

    setScore(score) {
        if (score !== undefined) {
            this.score = score;
        }
    }

    setAvatar(avatar) {
        if (avatar !== undefined) {
            this.avatar = avatar;
        }
    }

    setDeleted(deleted) {
        if (deleted !== undefined) {
            this.deleted = deleted;
        }
    }

    setLastlogin(lastlogin) {
        if (lastlogin !== undefined) {
            this.lastlogin = lastlogin;
        }
    }

    setEmails(emails) {
        if (this.id !== undefined) {
            this.emails = emails;
        }
    }

    setFriends(friends) {
        if (this.id !== undefined) {
            this.friends = friends;
        }
    }

    setVerified(verified) {
        if (verified !== undefined) {
            this.verified = verified;
        }
    }
}

module.exports = User;
