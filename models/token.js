class Token {
    constructor({
        id, token, createdat, expires, type, status, userid,
    }) {
        this.setId(id);
        this.setToken(token);
        this.setCreatedAt(createdat);
        this.setExpires(expires);
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

    getExpires() {
        return this.expires;
    }

    getType() {
        return this.type;
    }

    getStatus() {
        return this.status;
    }

    getUserId() {
        return this.userid;
    }

    setId(id) {
        if (id !== undefined) this.id = id;
    }

    setToken(token) {
        this.token = token;
    }

    setCreatedAt(createdat) {
        this.createdat = createdat;
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

    setUserId(userid) {
        this.userid = userid;
    }

    isActive() {
        if (this.getStatus() === '0') {
            return false;
        }
        const now = new Date();
        const expires = new Date(this.getExpires());
        return expires - now > 0;
    }
}

module.exports = Token;
