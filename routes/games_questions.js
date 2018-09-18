const { Router } = require('express');

const gamesQuestions = Router();

gamesQuestions.get('/gamesquestions', (req, res) => {
    const answers = [
        {
            game: 1,
            question: 1,
            selected_option_player_1: 'Puerta Ordenadas Operable',
            option_player_1: false,
            selected_option_player_2: 'Programación Orientada a Objetos',
            option_player_2: true,
        },
        {
            game: 1,
            question: 2,
            selected_option_player_1: 'Linus',
            option_player_1: false,
            selected_option_player_2: 'BIll',
            option_player_2: true,
        },
    ];
    const json = {
        response: 'Ok',
        data: answers,
        total: 2,
    };
    res.status(200).send(json);
});

gamesQuestions.get('/gamesquestions/:game/:question', (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            game: req.params.game,
            question: req.params.question,
            selected_option_player_1: 'Linus',
            option_player_1: false,
            selected_option_player_2: 'Bill',
            option_player_2: true,
        },
    };
    res.status(200).send(json);
});

gamesQuestions.post('/gamesquestions', (req, res) => {
    const json = {
        response: 'OK',
        data: {
            game: req.body.game,
            question: req.body.question,
        },
    };
    res.status(200).send(json);
});

gamesQuestions.delete('/gamesquestions/:game/:question', (req, res) => {
    const json = {
        response: 'OK',
        game: req.params.game,
        question: req.params.question,
    };
    res.status(200).send(json);
});

gamesQuestions.patch('/gamesquestions/:game/:question', (req, res) => {
    res.status(204).send('Data is updated');
});

module.exports = gamesQuestions;
