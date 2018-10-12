class Token {
    constructor(id, token, createdAt, expires, type, status, userId) {
        this.setId(id);
        this.setToken(token);
        this.setCreatedAt(createdAt);
        this.setExpires(expires);
        this.setType(type);
        this.setStatus(status);
        this.setUserId(userId);
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

    getExpires() {
        return this.expires;
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

    setExpires(expires) {
        this.expires = expires;
    }

    setType(type) {
        this.type = type;
    }

    setStatus(status) {
        this.status = status;
    }

    setUserId(userId) {
        this.userId = userId;
    }
}

module.exports = Token;
