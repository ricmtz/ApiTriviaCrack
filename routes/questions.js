const { Router } = require('express');
const { questionsCtrl } = require('../controllers');

const questions = Router();

questions.get('/', questionsCtrl.getAll);

questions.get('/:questionId', questionsCtrl.get);

questions.post('/', questionsCtrl.create);

questions.delete('/:questionId', questionsCtrl.delete);

questions.patch('/:questionId', questionsCtrl.update);

module.exports = questions;
