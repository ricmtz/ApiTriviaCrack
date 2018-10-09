const { Router } = require('express');
const { questionsCtrl } = require('../controllers');

const router = Router();

router.get('/', questionsCtrl.getAll);

router.get('/:question', questionsCtrl.get);

router.post('/', questionsCtrl.create);

router.delete('/:question', questionsCtrl.delete);

router.patch('/:question', questionsCtrl.update);

module.exports = router;
