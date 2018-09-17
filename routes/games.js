const express = require('express');

const router = express.Router();

// Post game
router.post('/games', (req, res) => {
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
router.get('/games', (req, res) => {
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


module.exports = router;
