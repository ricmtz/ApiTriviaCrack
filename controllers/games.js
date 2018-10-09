const { GamesORM } = require('../orm');

class GamesCtrl {
    async getAll(req, res) {
        const result = await GamesORM.getAll();
        const json = {
            data: result,
            total: result.length
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
        if (result.length === 0) res.status(404);
        res.status(200).send(json);
    }

    async update(req, res) {
        const result = await GamesORM.update(req.params.gameId, req.body);
        const json = {
            data: result,
        };
        if (result.length === 0) {
            res.status(404);
        } else {
            res.status(204);
        }
        res.send(json);
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
