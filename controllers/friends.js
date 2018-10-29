const { UsersORM } = require('../orm');

// FIXME Todos los métodos deben estar documentados

class FriendsCtrl {
    // FIXME En los metodos getAll se debe permitir paginado y filtrado
    /**
     * This function request to the data base all the friends associates with
     * a certain nickname.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {String} req.params.nickname User nickname.
     */
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

    /**
     * This function request to the data base create a friend,
     * associating a certain user with an other certain user.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {String} req.params.nickname User nickname.
     * @param {String} req.body.nickname Friend nickname.
     */
    async create(req, res) {
        await UsersORM.addFriend(req.params.nickname, req.body.nickname, new Date().toISOString())
            .then((friend) => { res.status(200).send({ data: friend }); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    /**
     * This function request to the data base delete a friendship
     * between two certain users.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {String} req.params.nickname User nickname.
     * * @param {String} req.body.nickname Friend nickname.
     */
    async delete(req, res) {
        await UsersORM.deleteFriend(req.params.nickname, req.params.friendNickname)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }
}

module.exports = new FriendsCtrl();
