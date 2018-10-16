const { Router } = require('express');
const { questionsCtrl } = require('../controllers');
const { rules, defaultValues } = require('../middlewares');

const router = Router();

router.get('/', questionsCtrl.getAll);

// FIXME Falta validar el param :question
router.get('/:question', questionsCtrl.get);

router.post('/', [rules.createQuestion, defaultValues.defaultQuestion], questionsCtrl.create);

// FIXME Falta validar el param :question
router.delete('/:question', questionsCtrl.delete);

// FIXME Falta validar el param :question
router.patch('/:question', rules.updateQuestion, questionsCtrl.update);

module.exports = router;
