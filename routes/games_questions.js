const { Router } = require('express');
const { gamesQuestionsCtrl } = require('../controllers');
const { rules, auth } = require('../middlewares');

const router = Router({ mergeParams: true });

// Validation param questionId
router.use('/:questionId', rules.paramsGamesQuestions);

// Get all games_questions
router.get('/', auth.havePermissions, gamesQuestionsCtrl.getAll);

// Get question of game
router.get('/:questionId', auth.havePermissions, gamesQuestionsCtrl.get);

// Create questions
router.post('/', [rules.createGameQuestion, auth.havePermissions], gamesQuestionsCtrl.create);

// Delete question
router.delete('/:questionId', auth.havePermissions, gamesQuestionsCtrl.delete);

// Update question
router.patch('/:questionId', [rules.updateGameQuestion, auth.havePermissions], gamesQuestionsCtrl.update);

module.exports = router;
