class QuestionsUsersCtrl {
    constructor() {
        this.questionsUsers = [
            {
                question: 3,
                user: 3,
                nickname: 'juan',
                question_name: 'Que significa POO?',
                options: ['Poder Oro y Osio', 'Puerta Ordenadas Operable', 'Programación Orienta a Objetos'],
                correct: 'Programación Orienta a Objetos',
                createDate: '09/15/2018',
                approvedDate: '10/15/2018',
            },
            {
                question: 5,
                user: 1,
                nickname: 'pepe',
                question_name: 'Quien creo git?',
                options: ['Stallman', 'Linus', 'Bill'],
                correct: 'Bill',
                createDate: '09/15/2018',
                approvedDate: '10/15/2018',
            },
        ];
    }

    getAll(req, res) {
        const json = {
            response: 'Ok',
            data: this.questionsUsers,
            total: 2,
        };
        res.status(200).send(json);
    }

    static get(req, res) {
        const json = {
            response: 'Ok',
            data: this.questionsUsers.find(el => el.question === Number(req.params.question)
              && el.user === Number(req.params.user)),
        };
        res.status(200).send(json);
    }

    create(req, res) {
        const json = {
            response: 'Ok',
            question: 35,
            user: 90,
        };
        res.status(200).send(json);
    }

    update(req, res) {
        res.status(204).send('Data successfully updated');
    }

    delete(req, res) {
        const json = {
            response: 'Ok',
            questoin: req.params.question,
            user: req.params.user,
        };
        res.status(200).send(json);
    }
}

module.exports = new QuestionsUsersCtrl();
