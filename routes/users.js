const express = require('express');
const emailsRouter = require('./emails');
const friendsRouter = require('./friends');
const { usersCtrl } = require('../controllers');
const { rules, auth } = require('../middlewares');

const router = express.Router();

// Validation param nickname
router.use('/:nickname', auth.session, rules.paramsUser);

// List all users.
router.get('/', [auth.session, rules.getAllElements, rules.queryUser,
    rules.userScoreConv, rules.userScores, auth.havePermissions], usersCtrl.getAll);

// Find users.
router.get('/:nickname', [auth.session, auth.havePermissions], usersCtrl.get);

// Create users.
router.post('/', [rules.createUser, auth.havePermissions], usersCtrl.create);

// Delete users.
router.delete('/:nickname', [auth.session, auth.havePermissions], usersCtrl.delete);

// Update users.
router.patch('/:nickname', [auth.session, rules.updateUser, auth.havePermissions], usersCtrl.update);

router.use('/:nickname/emails', emailsRouter);
router.use('/:nickname/friends', friendsRouter);

module.exports = router;
