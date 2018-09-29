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

    getAll(req, res) {
        const json = {
            response: 'Ok',
            data: this.questions,
            total: 2,
        };
        res.status(200).send(json);
    }

    get(req, res) {
        const json = {
            response: 'Ok',
            data: this.questions.find(el => el.id === Number(req.params.questionId)),
        };
        res.status(200).send(json);
    }

    create(req, res) {
        const json = {
            response: 'OK',
            data: {
                questionId: req.body.questionId,
            },
        };
        res.status(200).send(json);
    }

    update(req, res) {
        res.status(204).send('Data successfully updated');
    }

    delete(req, res) {
        const json = {
            response: 'OK',
            questionID: req.params.questionId,
        };
        res.status(200).send(json);
    }
}

module.exports = new QuestionsCtrl();
