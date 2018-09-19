
exports.getAll = (req, res) => {
    const ques = [
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
    const json = {
        response: 'Ok',
        data: ques,
        total: 2,
    };
    res.status(200).send(json);
};

exports.get = (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            id: req.params.questionId,
            category: 3,
            question: '¿Cuál lenguaje de proramación no es orientado a objetos?',
            option_1: 'c++',
            option_2: 'java',
            option_correct: 'c',
        },
    };
    res.status(200).send(json);
};

exports.create = (req, res) => {
    const json = {
        response: 'OK',
        data: {
            questionID: req.body.questionID,
        },
    };
    res.status(200).send(json);
};

exports.update = (req, res) => {
    res.status(204).send('Data is updated');
};

exports.delete = (req, res) => {
    const json = {
        response: 'OK',
        questionID: req.params.questionId,
    };
    res.status(200).send(json);
};
