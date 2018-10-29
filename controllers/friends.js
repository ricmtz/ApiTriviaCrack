const { UsersORM } = require('../orm');

// FIXME Todos los métodos deben estar documentados

class FriendsCtrl {
    // FIXME En los metodos getAll se debe permitir paginado y filtrado
    async getAll(req, res) {
        await UsersORM.getFriends(req.params.nickname)
            .then((usr) => {
                res.status(200).send({
                    data: usr,
                });
            })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async create(req, res) {
<<<<<<< HEAD
        const data = {
            nicknameUser: req.params.nickname,
            nicknameFriend: req.body.nickname,
            date: new Date(),
=======
        const data = { nicknameFriend: req.body.nickname, date: new Date().toISOString() };
        const result = await UsersORM.addFriend(req.params.nickname, data);
        const json = {
            data: result,
>>>>>>> 7475df73fd8ec6668b15e7d525e4c0b5d23789a7
        };
        await UsersORM.addFriend(data)
            .then((usr) => { res.status(200).send({ data: usr }); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async delete(req, res) {
        const data = {
            nicknameUser: req.params.nickname,
            nicknameFriend: req.params.friendNickname,
        };
        await UsersORM.deleteFriend(data)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }
}

module.exports = new FriendsCtrl();
