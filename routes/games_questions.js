const { Router } = require('express');
const { gamesQuestionsCtrl } = require('../controllers');
const { rules, defaultValues } = require('../middlewares');

const router = Router({ mergeParams: true });

// Get all games_questions
router.get('/', gamesQuestionsCtrl.getAll);

// Get question of game
router.get('/:questionId', gamesQuestionsCtrl.get);

// Create questions
router.post('/', [rules.createGameQuestion, defaultValues.defaultGameQuestion], gamesQuestionsCtrl.create);

// Delete question
router.delete('/:questionId', gamesQuestionsCtrl.delete);

// Update question
router.patch('/:questionId', rules.updateGameQuestion, gamesQuestionsCtrl.update);

module.exports = router;
