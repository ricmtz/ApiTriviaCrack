const { Router } = require('express');

const router = Router();

const bodyParser = require('body-parser');

const notFound = require('../middlewares/generator');

const usersRouter = require('./users');
const categoriesRouter = require('./categories');
const questionsRouter = require('./questions');
const gamesRouter = require('./games');
const authRouter = require('./auth');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use(authRouter);
router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/questions', questionsRouter);
router.use('/games', gamesRouter);

router.use(notFound);

module.exports = router;
