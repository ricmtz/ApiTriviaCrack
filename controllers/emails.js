const { UsersORM } = require('../orm');

// FIXME Todos los métodos deben estar documentados

class EmailsCtrl {
    async getAll(req, res) {
        await UsersORM.getEmails(req.params.nickname, req.query.page)
            .then((email) => {
                res.status(200).send({
                    data: email,
                    total: email.length,
                });
            })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async create(req, res) {
        await UsersORM.addEmail(req.params.nickname, req.body.email)
            .then((email) => { res.status(200).send({ data: email }); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async update(req, res) {
        await UsersORM.updateEmail(req.params.nickname, req.body.oldEmail, req.body.newEmail)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async delete(req, res) {
        await UsersORM.deleteEmail(req.params.nickname, req.body.email)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }
}

module.exports = new EmailsCtrl();
