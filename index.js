const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.use(usersRouter);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
