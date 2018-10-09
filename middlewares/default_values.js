function defaultUser(req, res, next) {
    req.body.score = 0;
    req.body.avatar = 'default.png';
    req.body.lastlogin = new Date().toISOString();
    next();
}

function defualtFriend(req, res, next) {
    req.body.friendshipdate = new Date().toISOString();
    next();
}

module.exports = { defaultUser, defualtFriend };
