require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const { errorHandler, file } = require('./middlewares');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.use(errorHandler);

file.createFolder('uploads');

app.listen(process.env.PORT, () => {
    console.log(`API listening on port ${process.env.PORT}!`);
});
