const { Router } = require('express');

const router = Router();

const bodyParser = require('body-parser');

const notFound = require('../middlewares/generator');

const usersRouter = require('./users');
const categoriesRouter = require('./categories');
const questionsRouter = require('./questions');
const gamesRouter = require('./games');

// FIXME El uso de middlewares que son para toda la aplicación se deben mantener en la app y no en rutas
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/questions', questionsRouter);
router.use('/games', gamesRouter);

// FIXME El uso de middlewares que son para toda la aplicación se deben mantener en la app y no en rutas
router.use(notFound);

module.exports = router;
