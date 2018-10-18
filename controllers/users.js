const { UsersORM } = require('../orm');

// FIXME Todos los métodos deben estar documentados

class UsersCtrl {
    // FIXME En los metodos getAll se debe permitir paginado y filtrado
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
        req.body.admin = false;
        req.body.score = 0;
        req.body.avatar = 'default.png';
        req.body.lastlogin = new Date().toISOString();
        req.body.deleted = false;
        const result = await UsersORM.create(req.body);
        const json = {
            data: result,
        };
        // FIXME Me sangraron los ojos al ver este tipo de condicionales en una linea, please FIXME
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
