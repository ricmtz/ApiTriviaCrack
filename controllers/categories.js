const { CategoriesORM } = require('../orm');

class CategoriesCtrl {
    static async getAll(req, res) {
        const result = await CategoriesORM.getAll();
        const json = {
            data: result,
            total: result.length,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
    }

    static async get(req, res) {
        const result = await CategoriesORM.get(req.params.categoryId);
        const json = {
            data: result,
        };
        if ((typeof result) === 'string') res.status(404);
        res.send(json);
    }

    static async create(req, res) {
        const result = await CategoriesORM.create(req.body);
        const json = {
            data: result,
        };
        if ((typeof result) === 'string') res.status(404);
        else res.status(201);
        res.send(json);
    }

    static async update(req, res) {
        const result = await CategoriesORM.update(req.params.categoryId, req.body);
        if ((typeof result) === 'string') {
            res.status(404);
            res.send({ data: result });
        } else res.status(204).send();
    }

    static async delete(req, res) {
        const result = await CategoriesORM.delete(req.params.categoryId);
        if ((typeof result) === 'string') {
            res.status(404);
            res.send({ data: result });
        } else res.status(204).send();
    }
}

module.exports = CategoriesCtrl;
