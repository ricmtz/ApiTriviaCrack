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
        req.body.answersplayer1 = -1;
        req.body.answersplayer2 = -1;
        req.body.createdate = new Date().toISOString();
        req.body.finished = false;
        req.body.deleted = false;
        await GamesORM.create(req.body)
            .then((game) => { res.status(200).send({ data: game }); })
            .catch((err) => { res.status(404).send({ data: err.message }); })
    }

    async update(req, res) {
        await GamesORM.update(req.params.gameId, req.body)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async delete(req, res) {
        await GamesORM.delete(req.params.gameId)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }
}

module.exports = new GamesCtrl();
