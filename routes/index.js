const { Router } = require('express');

const router = Router();

const usersRouter = require('./users');
const categoriesRouter = require('./categories');
const questionsRouter = require('./questions');
const gamesRouter = require('./games');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/questions', questionsRouter);
router.use('/games', gamesRouter);

module.exports = router;
