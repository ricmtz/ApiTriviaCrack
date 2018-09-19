
exports.getAll = (req, res) => {
    const questionsUsers = [
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
    const json = {
        response: 'Ok',
        data: questionsUsers,
        total: 2,
    };
    res.status(200).send(json);
};

exports.get = (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            question: req.params.question,
            user: req.params.user,
            qusetion_name: 'Quien creo git?',
            options: ['Stallman', 'Linus', 'Bill'],
            correct: 'Bill',
            createDate: '09/15/2018',
            approvedDate: '10/15/2018',
        },
    };
    res.status(200).send(json);
};

exports.create = (req, res) => {
    const json = {
        response: 'Ok',
        question: 35,
        user: 90,
    };
    res.status(200).send(json);
};

exports.update = (req, res) => {
    res.status(204).send('Data successfully updated');
};

exports.delete = (req, res) => {
    const json = {
        response: 'Ok',
        questoin: req.params.question,
        user: req.params.user,
    };
    res.status(200).send(json);
};
