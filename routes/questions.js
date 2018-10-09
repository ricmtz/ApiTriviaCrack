const { Router } = require('express');
const { questionsCtrl } = require('../controllers');
const { rules, defaultValues } = require('../middlewares');

const router = Router();

router.get('/', questionsCtrl.getAll);

router.get('/:questionId', questionsCtrl.get);

router.post('/', [rules.createQuestion, defaultValues.defaultQuestion], questionsCtrl.create);

router.delete('/:questionId', questionsCtrl.delete);

router.patch('/:questionId', rules.updateQuestion, questionsCtrl.update);

module.exports = router;
