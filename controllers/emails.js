const { UsersORM } = require('../orm');

class EmailsCtrl {
    static async getAll(req, res) {
        const result = await UsersORM.getEmails(req.params.nickname);
        const json = {
            data: result,
        };
        if ((typeof result) === 'string') res.status(404);
        res.send(json);
    }

    static async create(req, res) {
        const data = { nicknameUser: req.params.nickname, emailUser: req.body.email };
        const result = await UsersORM.addEmail(data);
        const json = {
            data: result,
        };
        if ((typeof result) === 'string') res.status(404);
        else res.status(201);
        res.send(json);
    }

    static async update(req, res) {
        const data = { nicknameUser: req.params.nickname, emailUser: req.body.oldEmail };
        const result = await UsersORM.updateEmail(data, req.body.newEmail);
        if ((typeof result) === 'string') {
            res.status(404);
            res.send({ data: result });
        } else res.status(204).send();
    }

    static async delete(req, res) {
        const data = { nicknameUser: req.params.nickname, emailUser: req.body.email };
        const result = await UsersORM.deleteEmail(data);
        if ((typeof result) === 'string') {
            res.status(404);
            res.send({ data: result });
        } else res.status(204).send();
    }
}

module.exports = EmailsCtrl;
