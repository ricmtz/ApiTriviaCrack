const { Router } = require('express');
const { questionsCtrl } = require('../controllers');
const { rules, auth } = require('../middlewares');

const router = Router();

// Validation param question
router.use('/:question', rules.paramsQuestions);

// Get all question.
router.get('/', auth.havePermissions, questionsCtrl.getAll);

// Get question.
router.get('/:question', auth.havePermissions, questionsCtrl.get);

// Create question.
router.post('/', [rules.createQuestion, auth.havePermissions], questionsCtrl.create);

// Remove question.
router.delete('/:question', auth.havePermissions, questionsCtrl.delete);

// Update question.
router.patch('/:question', [rules.updateQuestion, auth.havePermissions], questionsCtrl.update);

module.exports = router;
