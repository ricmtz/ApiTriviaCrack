const express = require('express');

const router = express.Router();

// List all questions users.
router.get('/questions_users', (req, res) => {
    const questionsUsers = [
        {
            nickname: 'juan',
            question: 'Que significa POO?',
            createDate: '09/15/2018',
            approvedDate: '10/15/2018',
        },
        {
            nickname: 'pepe',
            question: 'Quien creo git?',
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
});

// Find question user.
router.get('/questions_users/:idQuestionsUsers', (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            id: req.params.idQuestionsUsers,
            questios: {
                nickname: 'juan',
                question: 'Quien creo git?',
                createDate: '09/15/2018',
                approvedDate: '10/15/2018',
            },
            total: 1,
        },
    };
    res.status(200).send(json);
});

// Create question user
router.post('/questions_users', (req, res) => {
    const json = {
        response: 'Ok',
        id: 1012,
    };
    res.status(200).send(json);
});

// Delete question user
router.delete('/questions_users/:idQuestionsUsers', (req, res) => {
    const json = {
        response: 'Ok',
        id: req.params.idQuestionsUsers,
    };
    res.status(200).send(json);
});

// Update question user.
router.delete('/questions_users/:idQuestionsUsers', (req, res) => {
    res.status(204).send('Data is updated');
});

module.exports = router;
