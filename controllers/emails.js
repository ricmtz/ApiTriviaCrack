const { UsersORM } = require('../orm');

// FIXME Todos los métodos deben estar documentados

class EmailsCtrl {
    async getAll(req, res) {
<<<<<<< HEAD
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
=======
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
>>>>>>> 7475df73fd8ec6668b15e7d525e4c0b5d23789a7
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async update(req, res) {
<<<<<<< HEAD
        const data = {
            nicknameUser: req.params.nickname,
            emailUser: req.body.oldEmail,
            newEmail: req.body.newEmail,
        };
        await UsersORM.updateEmail(data)
=======
        await UsersORM.updateEmail(req.params.nickname, req.body.oldEmail, req.body.newEmail)
>>>>>>> 7475df73fd8ec6668b15e7d525e4c0b5d23789a7
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async delete(req, res) {
<<<<<<< HEAD
        const data = { nicknameUser: req.params.nickname, emailUser: req.body.email };
        await UsersORM.deleteEmail(data)
=======
        await UsersORM.deleteEmail(req.params.nickname, req.body.email)
>>>>>>> 7475df73fd8ec6668b15e7d525e4c0b5d23789a7
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }
}

module.exports = new EmailsCtrl();
