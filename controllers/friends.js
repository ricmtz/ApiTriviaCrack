const { UsersORM } = require('../orm');

class FriendsCtrl {
    static async getAll(req, res) {
        const result = await UsersORM.getFriends(req.params.nickname);
        const json = {
            data: result,
            total: result.length,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
    }

    static async create(req, res) {
        const data = { nicknameFriend: req.body.nickname, date: req.body.friendshipdate };
        const result = await UsersORM.addFriend(req.params.nickname, data);
        const json = {
            data: result,
        };
        if ((typeof result) === 'string') res.status(404);
        else res.status(201);
        res.send(json);
    }

    static async delete(req, res) {
        const data = {
            nicknameUser: req.params.nickname,
            nicknameFriend: req.params.friendNickname,
        };
        const result = await UsersORM.deleteFriend(data);
        if ((typeof result) === 'string') {
            res.status(404);
            res.send({ data: result });
        } else res.status(204).send();
    }
}

module.exports = FriendsCtrl;
