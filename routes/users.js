const express = require('express');
const emailsRouter = require('./emails');
const friendsRouter = require('./friends');
const { usersCtrl } = require('../controllers');
const { rules } = require('../middlewares');

const router = express.Router();

// Validation param nickname
router.use('/:nickname', rules.paramsUser);

// List all users.
router.get('/', usersCtrl.getAll);

// Find users.
router.get('/:nickname', usersCtrl.get);

// Create users.
router.post('/', rules.createUser, usersCtrl.create);

// Delete users.
router.delete('/:nickname', usersCtrl.delete);

// Update users.
router.patch('/:nickname', rules.updateUser, usersCtrl.update);

router.use('/:nickname/emails', emailsRouter);
router.use('/:nickname/friends', friendsRouter);

module.exports = router;
