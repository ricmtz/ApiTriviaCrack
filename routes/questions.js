const { Router } = require('express');
const { questionsCtrl } = require('../controllers');
const { rules } = require('../middlewares');

const router = Router();

// Validation param question
router.use('/:question', rules.paramsQuestions);

// Get all question.
router.get('/', questionsCtrl.getAll);

<<<<<<< HEAD
// FIXME Falta validar el param :question
router.get('/:questionId', questionsCtrl.get);
=======
// Get question.
router.get('/:question', questionsCtrl.get);
>>>>>>> 7475df73fd8ec6668b15e7d525e4c0b5d23789a7

// Create question.
router.post('/', rules.createQuestion, questionsCtrl.create);

<<<<<<< HEAD
// FIXME Falta validar el param :question
router.delete('/:questionId', questionsCtrl.delete);
=======
// Remove question.
router.delete('/:question', questionsCtrl.delete);
>>>>>>> 7475df73fd8ec6668b15e7d525e4c0b5d23789a7

// Update question.
router.patch('/:question', rules.updateQuestion, questionsCtrl.update);

module.exports = router;
