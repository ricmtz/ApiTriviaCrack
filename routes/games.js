const express = require('express');

const router = express.Router();

// Post game
router.post('/', (req, res) => {
    const generatedId = 15;
    const json = {
        response: 'Created',
        data: {
            id: generatedId,
            url: `https://domain/games/${req.body.player_1}&${req.body.player_2}`,
        },
    };
    res.status(201).send(json);
});

// Get all games
router.get('/', (req, res) => {
    const games = [
        {
            id: 9,
            player_1: 8,
            player_2: 45,
            answers_player_1: 3,
            answers_player_2: 4,
        },
        {
            id: 84,
            player_1: 64,
            player_2: 71,
            answers_player_1: 6,
            answers_player_2: 7,
        },
    ];
    const json = {
        response: 'Ok',
        data: games,
    };
    res.status(200).send(json);
});

// Get game by Id
router.get('/:gameId', (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            id: `${req.params.gameId}`,
            player_1: 48,
            player_2: 24,
            answers_player_1: 0,
            answers_player_2: 2,
        },
    };
    res.status(200).send(json);
});

// Put game
router.put('/:gameId', (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            id: req.params.gameId,
        },
    };
    res.status(200).send(json);
});

// Delete game
router.delete('/:gameId', (req, res) => {
    const json = {
        response: 'No content',
        data: {},
    };
    res.status(204).send(json);
});

// Delete all games
router.delete('/', (req, res) => {
    const json = {
        response: 'No content',
        data: {},
    };
    res.status(204).send(json);
});

module.exports = router;
