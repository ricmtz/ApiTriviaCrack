const { QuestionsORM } = require('../orm');

// FIXME Todos los métodos deben estar documentados

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
    }

    // FIXME En los metodos getAll se debe permitir paginado y filtrado
    static async getAll(req, res) {
        const result = await QuestionsORM.getAll();
        const json = {
            data: result,
            total: result.length,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
    }

    static async get(req, res) {
        const result = await QuestionsORM.get(req.params.question);
        const json = {
            data: result,
        };
        if ((typeof result) === 'string') res.status(404);
        res.send(json);
    }

    static async create(req, res) {
        req.body.approved = false;
        req.body.deleted = false;
        req.body.createdate = new Date().toISOString();
        const result = await QuestionsORM.create(req.body);
        const json = {
            data: result,
        };
        if ((typeof result) === 'string') res.status(404);
        else res.status(201);
        res.send(json);
    }

    static async update(req, res) {
        const result = await QuestionsORM.update(req.params.question, req.body);
        if ((typeof result) === 'string') {
            res.status(404);
            res.send({ data: result });
        } else res.status(204).send();
    }

    static async delete(req, res) {
        const result = await QuestionsORM.delete(req.params.question);
        if ((typeof result) === 'string') {
            res.status(404);
            res.send({ data: result });
        } else res.status(204).send();
    }
}

module.exports = QuestionsCtrl;
