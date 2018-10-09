const { Router } = require('express');
const { gamesQuestionsCtrl } = require('../controllers');
const middlewares = require('../middlewares');

const router = Router({ mergeParams: true });

// Get all games_questions
router.get('/', gamesQuestionsCtrl.getAll);

// Get question of game
router.get('/:questionId', gamesQuestionsCtrl.get);

// Create questions
router.post('/', middlewares.rules.createGameQuestion, gamesQuestionsCtrl.create);

// Delete question
router.delete('/:questionId', gamesQuestionsCtrl.delete);

// Update question
router.patch('/:questionId', middlewares.rules.updateGameQuestion, gamesQuestionsCtrl.update);

module.exports = router;
