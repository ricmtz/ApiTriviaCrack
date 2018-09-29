const { Router } = require('express');
const { gamesCtrl } = require('../controllers');

const router = Router();

// Get all games_questions
router.get('/:gameId/games_questions', gamesCtrl.getAllGamesQuestions);

// Get question of game
router.get('/:gameId/:questionId', gamesCtrl.getGameQuestion);

// Create questions
router.post('/:gameId/games_questions', gamesCtrl.createQuestions);

// Delete question
router.delete('/:gameId/:questionId', gamesCtrl.removeQuestion);

// Update question
router.patch('/:gameId/:questionId', gamesCtrl.updateQuestion);

module.exports = router;
