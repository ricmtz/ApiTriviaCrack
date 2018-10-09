const { Router } = require('express');
const { questionsCtrl } = require('../controllers');
const middlewares = require('../middlewares');

const router = Router();

router.get('/', questionsCtrl.getAll);

router.get('/:questionId', questionsCtrl.get);

router.post('/', middlewares.rules.createQuestion, questionsCtrl.create);

router.delete('/:questionId', questionsCtrl.delete);

router.patch('/:questionId', middlewares.rules.updateQuestion, questionsCtrl.update);

module.exports = router;
