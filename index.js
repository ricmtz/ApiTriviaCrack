require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const { errorHandler } = require('./middlewares');
const { mailer } = require('./mail');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    const options = {
        to: 'irving.cervantes.inco@gmail.com',
        subject: 'Hola Irving ✔',
        text: 'Este es un correo de prueba',
        html: '<b>Texto en negritas</b>',
    };
    mailer.sendMail(options);
    console.log(`API listening on port ${process.env.PORT}!`);
});
