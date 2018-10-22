const { Router } = require('express');
const { gamesCtrl } = require('../controllers');
const gamesQuestionsRouter = require('./games_questions');
const { rules, defaultValues } = require('../middlewares');

const router = Router();

// Post game
router.post('/', [rules.createGame, defaultValues.defaultGame], gamesCtrl.create);

// Get all games
router.get('/', gamesCtrl.getAll);

// Get game by Id
// FIXME Falta validar el param :gameId
router.get('/:gameId', gamesCtrl.get);

// Put game
// FIXME Falta validar el param :gameId
router.patch('/:gameId', rules.updateGame, gamesCtrl.update);

// Delete game
// FIXME Falta validar el param :gameId
router.delete('/:gameId', gamesCtrl.delete);

// FIXME Falta validar el param :gameId
router.use('/:gameId/games_questions', gamesQuestionsRouter);

module.exports = router;
