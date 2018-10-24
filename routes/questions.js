const { Router } = require('express');
const { questionsCtrl } = require('../controllers');
const { rules } = require('../middlewares');

const router = Router();

// Validation param question
router.use('/:question', rules.paramsQuestions);

// Get all question.
router.get('/', questionsCtrl.getAll);

// Get question.
router.get('/:question', questionsCtrl.get);

// Create question.
router.post('/', rules.createQuestion, questionsCtrl.create);

// Remove question.
router.delete('/:question', questionsCtrl.delete);

// Update question.
router.patch('/:question', rules.updateQuestion, questionsCtrl.update);

module.exports = router;
