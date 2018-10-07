const { Router } = require('express');
const { gamesCtrl } = require('../controllers');

const router = Router({ mergeParams: true });

// Get all games_questions
router.get('/', gamesCtrl.getAllGamesQuestions);

// Get question of game
router.get('/:questionId', gamesCtrl.getGameQuestion);

// Create questions
router.post('/', gamesCtrl.createQuestions);

// Delete question
router.delete('/:questionId', gamesCtrl.removeQuestion);

// Update question
router.patch('/:questionId', gamesCtrl.updateQuestion);

module.exports = router;
