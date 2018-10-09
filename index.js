require('dotenv').config();
const express = require('express');
const router = require('./routes');
const { errorHandler } = require('./middlewares');

const app = express();


app.use('/', router);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`API listening on port ${process.env.PORT}!`);
});
