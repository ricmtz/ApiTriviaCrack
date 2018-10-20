const { UsersORM } = require('../orm');

class UsersCtrl {
    async getAll(req, res) {
        await UsersORM.getAll()
            .then((usrs) => {
                res.status(200).send({
                    data: usrs,
                    total: usrs.length,
                });
            })
            .catch((err) => { res.status(404).send({ data: err }); });
    }

    async get(req, res) {
        await UsersORM.getByNickname(req.params.nickname)
            .then((usr) => { res.status(200).send({ data: usr }); })
            .catch((err) => { res.status(404).send({ data: err }); });
    }

    async create(req, res) {
        await UsersORM.create(req.body)
            .then((usr) => { res.status(200).send({ data: usr }); })
            .catch((err) => { res.status(404).send({ data: err }); });
    }

    async update(req, res) {
        await UsersORM.update(req.params.nickname, req.body)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err }); });
    }

    async delete(req, res) {
        await UsersORM.delete(req.params.nickname)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err }); });
    }
}

module.exports = new UsersCtrl();
