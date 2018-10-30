const express = require('express');
const emailsRouter = require('./emails');
const friendsRouter = require('./friends');
const { usersCtrl } = require('../controllers');
const { rules, auth } = require('../middlewares');

const router = express.Router();

//router.use(auth.session);

// Validation param nickname
router.use('/:nickname', rules.paramsUser);

// List all users.
router.get('/', [rules.getAllElements, auth.havePermissions], usersCtrl.getAll);

// Find users.
router.get('/:nickname', auth.havePermissions, usersCtrl.get);

// Create users.
router.post('/', [rules.createUser, auth.havePermissions], usersCtrl.create);

// Delete users.
router.delete('/:nickname', auth.havePermissions, usersCtrl.delete);

// Update users.
router.patch('/:nickname', [rules.updateUser, auth.havePermissions], usersCtrl.update);

router.use('/:nickname/emails', emailsRouter);
router.use('/:nickname/friends', friendsRouter);

module.exports = router;
