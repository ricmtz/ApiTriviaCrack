const { Router } = require('express');
const { gamesCtrl } = require('../controllers');
const gamesQuestionsRouter = require('./games_questions');
const { rules, auth } = require('../middlewares');

const router = Router();

// Validation param gameId
router.use('/:gameId', rules.paramsGames);

// Post game
router.post('/', [rules.createGame, auth.havePermissions], gamesCtrl.create);

// Get all games
router.get('/', auth.havePermissions, gamesCtrl.getAll);

// Get game by Id
router.get('/:gameId', auth.havePermissions, gamesCtrl.get);

// Put game
router.patch('/:gameId', auth.havePermissions, rules.updateGame, gamesCtrl.update);

// Delete game
router.delete('/:gameId', auth.havePermissions, gamesCtrl.delete);

router.use('/:gameId/games_questions', gamesQuestionsRouter);

module.exports = router;
