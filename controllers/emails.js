const { UsersORM } = require('../orm');

// FIXME Todos los métodos deben estar documentados

class EmailsCtrl {
    async getAll(req, res) {
        await UsersORM.getEmails(req.params.nickname)
            .then((usr) => {
                res.status(200).send({
                    data: usr,
                });
            })
            .catch((err) => { res.status(404).send({ data: err.message }); });
        res.send(json);
    }

    async create(req, res) {
        await UsersORM.addEmail(
            { nicknameUser: req.params.nickname, emailUser: req.body.email }
        )
            .then((usr) => { res.status(200).send({ data: usr }); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async update(req, res) {
        const data = {
            nicknameUser: req.params.nickname,
            emailUser: req.body.oldEmail,
            newEmail: req.body.newEmail,
        };
        await UsersORM.updateEmail(data)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async delete(req, res) {
        const data = { nicknameUser: req.params.nickname, emailUser: req.body.email };
        await UsersORM.deleteEmail(data)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }
}

module.exports = new EmailsCtrl();
