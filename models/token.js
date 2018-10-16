class Token {
    constructor({
        id, token, createdat, expiresat, type, status, userid,
    }) {
        this.setId(id);
        this.setToken(token);
        this.setCreatedAt(createdat);
        this.setExpiresAt(expiresat);
        this.setType(type);
        this.setStatus(status);
        this.setUserId(userid);
    }

    getId() {
        return this.id;
    }

    getToken() {
        return this.token;
    }

    getCreatedAt() {
        return this.createdat;
    }

    getExpiresAt() {
        return this.expiresat;
    }

    getType() {
        return this.type;
    }

    getStatus() {
        return this.type;
    }

    getUserId() {
        return this.userid;
    }

    setId(id) {
        this.id = id;
    }

    setToken(token) {
        this.token = token;
    }

    setCreatedAt(createdAt) {
        this.createdAt = createdAt;
    }

    setExpiresAt(expiresat) {
        this.expiresat = expiresat;
    }

    setType(type) {
        this.type = type;
    }

    setStatus(status) {
        this.status = status;
    }

    setUserId(userid) {
        this.userId = userid;
    }
}

module.exports = Token;
