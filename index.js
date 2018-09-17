const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(usersRouter);
app.use(categoriesRouter);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
