const express = require('express');

const router = express.Router();

// Post category
router.post('/categories', (req, res) => {
    const generatedId = 5;
    const json = {
        response: 'Created',
        data: {
            id: generatedId,
            url: `https://domain/categories/${req.body.name}`,
        },
    };
    res.status(201).send(json);
});

// Get all categories
router.get('/categories', (req, res) => {
    const categories = [
        {
            id: 5,
            name: 'Databases',
            color: 'Red',
            icon: 'Icon.png',
        },
        {
            id: 6,
            name: 'Software Engineering',
            color: 'Blue',
            icon: 'IconSE.png',
        },
    ];
    const json = {
        response: 'Ok',
        data: categories,
    };
    res.status(200).send(json);
});

// Get category by Id
router.get('/categories/:categoryId', (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            id: req.params.categoryId,
            name: `Category ${req.params.categoryId}`,
            color: 'White',
            icon: `Icon${req.params.categoryId}.png`,
        },
    };
    res.status(200).send(json);
});

// Put category
router.put('/categories/:categoryId', (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            id: req.params.categoryId,
            name: req.body.name,
        },
    };
    res.status(200).send(json);
});

// Delete category
router.delete('/categories/:categoryId', (req, res) => {
    const json = {
        response: 'No content',
        data: {},
    };
    res.status(204).send(json);
});

// Delete all categories
router.delete('/categories', (req, res) => {
    const json = {
        response: 'No content',
        data: {},
    };
    res.status(204).send(json);
});

module.exports = router;
