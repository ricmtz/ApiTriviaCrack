const { UsersORM } = require('../orm');

// FIXME Todos los métodos deben estar documentados

class FriendsCtrl {
    // FIXME En los metodos getAll se debe permitir paginado y filtrado
    async getAll(req, res) {
        await UsersORM.getFriends(req.params.nickname)
            .then((friend) => {
                res.status(200).send({
                    data: friend,
                    total: friend.length,
                });
            })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async create(req, res) {
        await UsersORM.addFriend(req.params.nickname, req.body.nickname, new Date().toISOString())
            .then((friend) => { res.status(200).send({ data: friend }); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async delete(req, res) {
        await UsersORM.deleteFriend(req.params.nickname, req.params.friendNickname)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }
}

module.exports = new FriendsCtrl();
