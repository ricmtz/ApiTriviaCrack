const { UsersORM } = require('../orm');

// FIXME Todos los métodos deben estar documentados

class UsersCtrl {
    async getAll(req, res) {
        await UsersORM.getAll(req.query.page)
            .then((usrs) => {
                res.status(200).send({
                    data: usrs,
                    total: usrs.length,
                });
            })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async get(req, res) {
        await UsersORM.getByNickname(req.params.nickname)
            .then((usr) => { res.status(200).send({ data: usr }); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async create(req, res) {
        req.body.admin = false;
        req.body.score = 0;
        req.body.avatar = 'default.png';
        req.body.lastlogin = new Date().toISOString();
        req.body.deleted = false;
        await UsersORM.create(req.body)
            .then((usr) => { res.status(200).send({ data: usr }); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async update(req, res) {
        await UsersORM.update(req.params.nickname, req.body)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async delete(req, res) {
        await UsersORM.delete(req.params.nickname)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }
}

module.exports = new UsersCtrl();
