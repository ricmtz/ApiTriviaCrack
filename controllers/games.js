const { GamesORM } = require('../orm');

// FIXME Todos los métodos deben estar documentados

class GamesCtrl {
    // FIXME En los metodos getAll se debe permitir paginado y filtrado
    async getAll(req, res) {
        const result = await GamesORM.getAll();
        const json = {
            data: result,
            total: result.length,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
    }

    async get(req, res) {
        const result = await GamesORM.get(req.params.gameId);
        const json = {
            data: result,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
    }

    async create(req, res) {
        const result = await GamesORM.create(req.body);
        const json = {
            data: result,
        };
        if ((typeof result) === 'string') res.status(404);
        else res.status(201);
        res.send(json);
    }

    async update(req, res) {
        const result = await GamesORM.update(req.params.gameId, req.body);
        if ((typeof result) === 'string') {
            res.status(404);
            res.send({ data: result });
        } else res.status(204).send();
    }

    async delete(req, res) {
        const result = await GamesORM.delete(req.params.gameId);
        if ((typeof result) === 'string') {
            res.status(404);
            res.send({ data: result });
        } else res.status(204).send();
    }
}

module.exports = new GamesCtrl();
