const { Router } = require('express');
const { gamesQuestionsCtrl } = require('../controllers');

const router = Router();

router.get('/', gamesQuestionsCtrl.getAll);

router.get('/:game/:question', gamesQuestionsCtrl.get);

router.post('/', gamesQuestionsCtrl.create);

router.delete('/:game/:question', gamesQuestionsCtrl.delete);

router.patch('/:game/:question', gamesQuestionsCtrl.update);

module.exports = router;
