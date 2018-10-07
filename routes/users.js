const express = require('express');
const emailsRouter = require('./emails');
const friendsRouter = require('./friends');
const { usersCtrl } = require('../controllers');

const router = express.Router();

// List all users.
router.get('/', usersCtrl.getAll);

// Find users.
router.get('/:nickname', usersCtrl.get);

// Create users.
router.post('/', usersCtrl.create);

// Delete users.
router.delete('/:nickname', usersCtrl.delete);

// Update users.
router.patch('/:nickname', usersCtrl.update);

// List all questions users.
router.get('/:nickname/questions_users', usersCtrl.getAllQuestions);

// Find question user.
router.get('/:nickname/questions_users/:questionId', usersCtrl.getQuestion);

// Create question user
router.post('/:nickname/questions_users', usersCtrl.createdQuestion);

// Delete question user
router.delete('/:nickname/questions_users/:questionId', usersCtrl.removeQuestion);

// Update question user.
router.patch('/:nickname/questions_users/:questionId', usersCtrl.updateQuestion);

router.use('/:nickname/emails', emailsRouter);
router.use('/:nickname/friends', friendsRouter);

module.exports = router;
