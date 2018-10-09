const { UsersORM } = require('../orm');

class FriendsCtrl {
    async getAll(req, res) {
        const result = await UsersORM.getFriends(req.params.nickname);
        const json = {
            data: result,
            total: result.length,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
    }

    async create(req, res) {
        const data = { nicknameFriend: req.body.friend, date: '2018-09-09' };
        const result = await UsersORM.addFriend(req.params.nickname, data);
        const json = {
            data: result,
        };
        if (result.length === 0) res.status(404);
        res.status(200).send(json);
    }

    async delete(req, res) {
        const data = {
            nicknameUser: req.params.nickname,
            nicknameFriend: req.params.friend
        };
        const result = await UsersORM.deleteFriend(data);
        const json = {
            data: result,
        };
        res.status(200).send(json);
    }
}

module.exports = new FriendsCtrl();
