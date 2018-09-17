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

module.exports = router;
