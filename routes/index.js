const { Router } = require('express');
const router = Router();
const bodyParser = require('body-parser');
const gamesQuestionsRouter = require('./games_questions');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use('/gamesquestions', gamesQuestionsRouter);

module.exports = router;
