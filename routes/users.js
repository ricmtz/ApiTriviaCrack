const express = require('express');
const { usersCtrl } = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

// List all users.
router.get('/', usersCtrl.getAll);

// Find users.
router.get('/:nickname', middlewares.valUser.getUser, usersCtrl.get);

// Create users.
router.post('/', middlewares.valUser.create, usersCtrl.create);

// Delete users.
router.delete('/:nickname', usersCtrl.delete);

// Update users.
router.patch('/:nickname', usersCtrl.update);

// Get all friends.
router.get('/:nickname/friends', usersCtrl.getAllFriends);

// Add friend
router.post('/:nickname/friends', usersCtrl.addFriend);

// Remove friend
router.delete('/:nickname/friends', usersCtrl.removeFriend);

// Get all emails
router.get('/:nickname/emails', usersCtrl.getAllEmails);

// Add email
router.post('/:nickname/emails', usersCtrl.addEmail);

// Update email
router.patch('/:nickname/emails/', usersCtrl.updateEmail);

// Remove email
router.delete('/:nickname/emails', usersCtrl.removeEmail);

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

module.exports = router;
