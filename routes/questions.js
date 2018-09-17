const { Router } = require('express');

const questions = Router();

questions.get('/questions', (req, res) => {
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
});

questions.get('/questions/:questionID', (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            id: req.params.questionID,
            category: 3,
            question: '¿Cuál lenguaje de proramación no es orientado a objetos?',
            option_1: 'c++',
            option_2: 'java',
            option_correct: 'c',
        },
    };
    res.status(200).send(json);
});

questions.post('/questions', (req, res) => {
    const json = {
        response: 'OK',
        data: {
            questionID: req.body.questionID,
        },
    };
    res.status(200).send(json);
});

questions.delete('/questions/:questionID', (req, res) => {
    const json = {
        response: 'OK',
        questionID: req.params.questionID,
    };
    res.status(200).send(json);
});

questions.patch('/questions/:questionID', (req, res) => {
    res.status(204).send('Data is updated');
});

module.exports = questions;
