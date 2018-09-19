const { Router } = require('express');

const router = Router();

const bodyParser = require('body-parser');
const usersRouter = require('./users');
const categoriesRouter = require('./categories');
const questionsUser = require('./questions_users');
const gamesQuestionsRouter = require('./games_questions');
const questionsRouter = require('./questions');
const games = require('./games');
const friendsRouter = require('./friends');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/questions_users', questionsUser);
router.use('/games_questions', gamesQuestionsRouter);
router.use('/questions', questionsRouter);
router.use('/games', games);
router.use('/friends', friendsRouter);

module.exports = router;
