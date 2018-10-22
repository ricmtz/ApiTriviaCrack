const { CategoriesORM } = require('../orm');

class CategoriesCtrl {
    async getAll(req, res) {
        await CategoriesORM.getAll(req.query)
            .then((categ) => {
                res.status(200).send({
                    data: categ,
                    total: categ.length,
                });
            })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async get(req, res) {
        await CategoriesORM.get(req.params)
            .then((categ) => { res.status(200).send({ data: categ, }); })
            .catch((err) => { res.status(404).send({ data: err.message, }); });
    }

    async create(req, res) {
        await CategoriesORM.create(req.body)
            .then((categ) => { res.status(200).send({ data: categ, }); })
            .catch((err) => { res.status(404).send({ data: err.message, }); });
    }

    async update(req, res) {
        await CategoriesORM.update(req.params, req.body)
            .then((categ) => { res.status(200).send({ data: categ, }); })
            .catch((err) => { res.status(404).send({ data: err, message, }); });
    }

    async delete(req, res) {
        await CategoriesORM.delete(req.params)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }
}

module.exports = new CategoriesCtrl();
