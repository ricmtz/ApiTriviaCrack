const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/categories', (req, res) => {
    const generatedId = 5;
    const json = {
        response: 'Created',
        data: {
            id: generatedId,
            url: `https://domain/categories/${generatedId}`,
        },
    };
    res.status(202).send(json);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
