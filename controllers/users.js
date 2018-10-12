const { UsersORM } = require('../orm');

class UsersCtrl {
    static async getAll(req, res) {
        const result = await UsersORM.getAll();
        const json = {
            data: result,
            total: result.length,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
    }

    static async get(req, res) {
        const result = await UsersORM.getNickname(req.params.nickname);
        const json = {
            data: result,
        };
        if ((typeof result) === 'string') res.status(404);
        res.send(json);
    }

    static async create(req, res) {
        const result = await UsersORM.create(req.body);
        const json = {
            data: result,
        };
        if ((typeof result) === 'string') res.status(404);
        else res.status(201);
        res.send(json);
    }

    static async update(req, res) {
        const result = await UsersORM.update(req.params.nickname, req.body);
        if ((typeof result) === 'string') {
            res.status(404);
            res.send({ data: result });
        } else res.status(204).send();
    }

    static async delete(req, res) {
        const result = await UsersORM.delete(req.params.nickname);
        if ((typeof result) === 'string') {
            res.status(404);
            res.send({ data: result });
        } else res.status(204).send();
    }
}

module.exports = UsersCtrl;
