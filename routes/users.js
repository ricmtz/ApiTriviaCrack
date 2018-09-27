const express = require('express');
const { usersCtrl } = require('../controllers');
const emailsRouter = require('./emails');
const friendsRouter = require('./friends');
const questionsUser = require('./questions_users');

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

router.use('/', emailsRouter);
router.use('/', friendsRouter);
router.use('/', questionsUser);

module.exports = router;
