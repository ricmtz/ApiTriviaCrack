const { Router } = require('express');
const { gamesCtrl } = require('../controllers');

const router = Router();

// Post game
router.post('/', gamesCtrl.create);

// Get all games
router.get('/', gamesCtrl.getAll);

// Get game by Id
router.get('/:gameId', gamesCtrl.get);

// Put game
router.put('/:gameId', gamesCtrl.update);

// Delete game
router.delete('/:gameId', gamesCtrl.delete);

// Delete all games
router.delete('/', gamesCtrl.deleteAll);

// Get all games_questions
router.get('/:gameId/games_questions', gamesCtrl.getAllGamesQuestions);

// Get question of game
router.get('/:gameId/games_questions/:questionId', gamesCtrl.getGameQuestion);

// Create questions
router.post('/:gameId/games_questions', gamesCtrl.createQuestions);

// Delete question
router.delete('/:gameId/games_questions/:questionId', gamesCtrl.removeQuestion);

// Update question
router.patch('/:gameId/games_questions/:questionId', gamesCtrl.updateQuestion);

module.exports = router;
