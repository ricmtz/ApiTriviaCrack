const express = require('express');

const router = express.Router();

// List all users.
router.get('/', (req, res) => {
    const users = [
        {
            id: 1,
            nickname: 'xXPedro777Xx',
            email: 'jose@gmail.com',
            current_points: 777,
        },
        {
            id: 2,
            nickname: 'xXRuben777Xx',
            email: 'ruben@gmail.com',
            current_points: 767,
        },
    ];
    const json = {
        response: 'Ok',
        data: users,
        total: 2,
    };
    res.status(200).send(json);
});

// Find users.
router.get('/:userId', (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            id: req.params.userId,
            nickname: 'xXRuben777Xx',
            email: 'ruben@gmail.com',
            current_points: 767,
        },
    };
    res.status(200).send(json);
});

// Create users.
router.post('/', (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            id: 100,
            nickname: req.body.nickname,
        },
    };
    res.status(200).send(json);
});

// Delete users.
router.delete('/:userId', (req, res) => {
    const json = {
        response: 'Ok',
        id: req.params.userId,
    };
    res.status(200).send(json);
});

// Update users.
router.patch('/:userId', (req, res) => {
    res.status(204).send('Data successfully updated');
});


module.exports = router;
