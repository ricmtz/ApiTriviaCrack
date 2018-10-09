const validator = require('./validator');

class ValFriend {
    static create(req, res, next) {
        validator.validate(req, res, next, {
            params: {
                nickname: 'nickname',
            },
            body: {
                nickname: 'nickname,required',
            },
        });
    }
}

module.exports = ValFriend;
