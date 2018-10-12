const { Router } = require('express');
const { questionsCtrl } = require('../controllers');
const { rules, defaultValues } = require('../middlewares');

const router = Router();

router.get('/', questionsCtrl.getAll);

router.get('/:question', questionsCtrl.get);

router.post('/', [rules.createQuestion, defaultValues.defaultQuestion], questionsCtrl.create);

router.delete('/:question', questionsCtrl.delete);

router.patch('/:question', rules.updateQuestion, questionsCtrl.update);

module.exports = router;
