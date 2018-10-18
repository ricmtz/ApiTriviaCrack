const { Router } = require('express');
const { gamesQuestionsCtrl } = require('../controllers');
const { rules } = require('../middlewares');

const router = Router({ mergeParams: true });

// Get all games_questions
router.get('/', gamesQuestionsCtrl.getAll);

// Get question of game
// FIXME Falta validar el param :questionId
router.get('/:questionId', gamesQuestionsCtrl.get);

// Create questions
router.post('/', rules.createGameQuestion, gamesQuestionsCtrl.create);

// Delete question
// FIXME Falta validar el param :questionId
router.delete('/:questionId', gamesQuestionsCtrl.delete);

// Update question
// FIXME Falta validar el param :questionId
router.patch('/:questionId', rules.updateGameQuestion, gamesQuestionsCtrl.update);

module.exports = router;
