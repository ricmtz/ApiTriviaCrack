const { CategoriesORM } = require('../orm');

class CategoriesCtrl {
    async getAll(req, res) {
      const result = await CategoriesORM.getAll();
      const json = {
          data: result,
          total: result.length,
      };
      if (result.length === 0) res.status(404);
      res.send(json);
    }

    async get(req, res) {
        const result = await CategoriesORM.getCategory(req.params.category);
        const json = {
            data: result,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
    }

    async create(req, res) {
        const result = await CategoriesORM.create(req.body);
        const json = {
            data: result,
        };
        if (result.length === 0) res.status(404);
        res.status(200).send(json);
    }

    async update(req, res) {
        const result = await CategoriesORM.update(req.params.category, req.body);
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
        const result = await CategoriesORM.delete(req.params.category);
        const json = {
            data: result,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
    }
}

module.exports = new CategoriesCtrl();
