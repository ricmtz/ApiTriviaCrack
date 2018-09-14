const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/categories', (req, res) => {
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

app.get('/categories', (req, res) => {
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

app.get('/categories/:categoryId', (req, res) => {
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

app.put('/categories/:categoryId', (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            id: req.params.categoryId,
            name: req.body.name,
        },
    };
    res.status(200).send(json);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
