const express = require('express');
const emailsRouter = require('./emails');
const friendsRouter = require('./friends');
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
router.patch('/:nickname', middlewares.valUser.update, usersCtrl.update);

router.use('/:nickname/emails', emailsRouter);
router.use('/:nickname/friends', friendsRouter);

module.exports = router;
