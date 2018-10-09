const { Router } = require('express');
const { gamesCtrl } = require('../controllers');
const gamesQuestionsRouter = require('./games_questions');
const middlewares = require('../middlewares');

const router = Router();

// Post game
router.post('/', middlewares.rules.createGame, gamesCtrl.create);

// Get all games
router.get('/', gamesCtrl.getAll);

// Get game by Id
router.get('/:gameId', gamesCtrl.get);

// Put game
router.patch('/:gameId', middlewares.rules.updateGame, gamesCtrl.update);

// Delete game
router.delete('/:gameId', gamesCtrl.delete);

router.use('/:gameId/games_questions', gamesQuestionsRouter);

module.exports = router;
