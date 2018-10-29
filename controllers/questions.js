const { QuestionsORM } = require('../orm');

// FIXME Todos los métodos deben estar documentados

class QuestionsCtrl {
    constructor() {
        this.create = this.create.bind(this);
    }

    async getAll(req, res) {
        await QuestionsORM.getAll(req.query.page)
            .then((quest) => {
                res.status(200).send({
                    data: quest,
                    total: quest.length,
                });
            })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async get(req, res) {
        await QuestionsORM.get(req.params.question)
            .then((quest) => { res.status(200).send({ data: quest }); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async create(req, res) {
        this.setDefaultValues(req);
        await QuestionsORM.create(req.body)
            .then((quest) => { res.status(200).send({ data: quest }); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async update(req, res) {
        await QuestionsORM.update(req.params.question, req.body)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async delete(req, res) {
        await QuestionsORM.delete(req.params.question)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    setDefaultValues(req) {
        req.body.approved = false;
        req.body.deleted = false;
        req.body.createdate = new Date().toISOString();
    }
}

module.exports = new QuestionsCtrl();
