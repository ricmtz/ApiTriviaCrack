const { UsersORM } = require('../orm');

class EmailsCtrl {
    async getAll(req, res) {
        const result = await UsersORM.getEmails(req.params.nickname);
        const json = {
            data: result,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
    }

    async create(req, res) {
        const data = { nicknameUser: req.params.nickname, emailUser: req.body.email };
        const result = await UsersORM.addEmail(data);
        const json = {
            data: result,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
    }

    async update(req, res) {
        const data = { nicknameUser: req.params.nickname, emailUser: req.body.oldEmail };
        const result = await UsersORM.updateEmail(data, req.body.newEmail);
        if (result.length === 0) {
            res.status(404);
        } else {
            res.status(204).send('Data successfully updated');
        }
    }

    async delete(req, res) {
        const data = { nicknameUser: req.params.nickname, emailUser: req.body.email };
        const result = await UsersORM.deleteEmail(data);
        if (result.length === 0) {
            res.status(404);
        } else {
            res.status(204).send('Data successfully updated');
        }
    }
}

module.exports = new EmailsCtrl();
