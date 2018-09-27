const { Router } = require('express');

const router = Router();

const bodyParser = require('body-parser');
const usersRouter = require('./users');
const categoriesRouter = require('./categories');
const questionsRouter = require('./questions');
const gamesRouter = require('./games');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/questions', questionsRouter);
router.use('/games', gamesRouter);

module.exports = router;
