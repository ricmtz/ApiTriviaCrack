const { Router } = require('express');
const { questionsCtrl } = require('../controllers');

const router = Router();

router.get('/', questionsCtrl.getAll);

router.get('/:questionId', questionsCtrl.get);

router.post('/', questionsCtrl.create);

router.delete('/:questionId', questionsCtrl.delete);

router.patch('/:questionId', questionsCtrl.update);

module.exports = router;
