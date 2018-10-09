class DefaultValues {
    static defaultUser(req, res, next) {
        req.body.score = 0;
        req.body.avatar = 'default.png';
        req.body.lastlogin = new Date().toISOString();
        req.body.deleted = false;
        next();
    }

    static defaultFriend(req, res, next) {
        req.body.friendshipdate = new Date().toISOString();
        next();
    }

    static defaultEmail(req, res, next) {
        req.body.deleted = false;
        next();
    }
}

module.exports = DefaultValues;
