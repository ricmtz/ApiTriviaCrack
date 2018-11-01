const { Router } = require('express');
const { AnswersCtrl } = require('../controllers');
const { rules, auth } = require('../middlewares');

const router = Router({ mergeParams: true });

router.use(auth.session);

// Validation param answerId
router.use('/:answerId', rules.paramsAnswers);

// Get all answers
router.get('/', auth.havePermissions, AnswersCtrl.getAll);

// Get answer of game
router.get('/:answerId', auth.havePermissions, AnswersCtrl.get);

// Create answer
router.post('/', [rules.createGameQuestion, auth.havePermissions], AnswersCtrl.create);

// Delete answer
router.delete('/:answerId', auth.havePermissions, AnswersCtrl.delete);

// Update answer
router.patch('/:answerId', [rules.updateGameQuestion, auth.havePermissions], AnswersCtrl.update);

module.exports = router;
