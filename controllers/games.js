const { GamesORM } = require('../orm');

// FIXME Todos los métodos deben estar documentados

class GamesCtrl {
    // FIXME En los metodos getAll se debe permitir paginado y filtrado
    async getAll(req, res) {
        await GamesORM.getAll(req.query.page)
            .then((game) => {
                res.status(200).send({
                    data: game,
                    total: game.length,
                });
            })
            .catch((err) => { res.status(404).send({ data: err.message }); })
    }

    async get(req, res) {
        await GamesORM.get(req.params.gameId)
            .then((game) => { res.status(200).send({ data: game }); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async create(req, res) {
        await GamesORM.create(req.body)
            .then((game) => { res.status(200).send({ data: game }); })
            .catch((err) => { res.status(404).send({ data: err.message }); })
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
        const json = {
            data: result,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
    }
}

module.exports = new GamesCtrl();
