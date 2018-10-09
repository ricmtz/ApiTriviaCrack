const { QuestionsORM } = require('../orm');

class QuestionsCtrl {
    constructor() {
        this.questions = [
            {
                id: 10,
                category: 3,
                question: '¿Cuál lenguaje de proramación no es orientado a objetos?',
                option_1: 'c++',
                option_2: 'java',
                option_correct: 'c',
            },
            {
                id: 45,
                category: 2,
                question: '¿Qué verbo no pertenece a los verbos de HTTP?',
                option_1: 'POST',
                option_2: 'DELETE',
                option_correct: 'REMOVE',
            },
        ];

        this.getAll = this.getAll.bind(this);
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(req, res) {
        const result = await QuestionsORM.getAll();
        const json = {
            data: result,
            total: result.length,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
    }

    async get(req, res) {
        const result = await QuestionsORM.get(req.params.question);
        const json = {
            data: result,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
    }

    async create(req, res) {
        const result = await QuestionsORM.create(req.body);
        const json = {
            data: result,
        };
        if (result.length === 0) res.status(404);
        res.status(200).send(json);
    }

    async update(req, res) {
        const result = await QuestionsORM.update(req.params.question, req.body);
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
        const result = await QuestionsORM.delete(req.params.question);
        const json = {
            data: result,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
    }
}

module.exports = new QuestionsCtrl();
