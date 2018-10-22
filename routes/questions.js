const { Router } = require('express');
const { questionsCtrl } = require('../controllers');
const { rules } = require('../middlewares');

const router = Router();

// Validation param question
router.use('/:question', rules.paramsQuestions);

// Get all question.
router.get('/', questionsCtrl.getAll);

// FIXME Falta validar el param :question
router.get('/:questionId', questionsCtrl.get);

// Create question.
router.post('/', rules.createQuestion, questionsCtrl.create);

// FIXME Falta validar el param :question
router.delete('/:questionId', questionsCtrl.delete);

// Update question.
router.patch('/:question', rules.updateQuestion, questionsCtrl.update);

module.exports = router;
