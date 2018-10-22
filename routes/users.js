const express = require('express');
const emailsRouter = require('./emails');
const friendsRouter = require('./friends');
const { usersCtrl } = require('../controllers');
const { rules, defaultValues, auth } = require('../middlewares');

const router = express.Router();

// router.use(auth.session);

// List all users.
router.get('/', [rules.getAllElements, defaultValues.defaultPage], usersCtrl.getAll);

// Find users.
router.get('/:nickname', rules.paramsUser, usersCtrl.get);

// Create users.
router.post('/', [rules.createUser, defaultValues.defaultUser], usersCtrl.create);

// Delete users.
router.delete('/:nickname', rules.paramsUser, usersCtrl.delete);

// Update users.
router.patch('/:nickname', rules.updateUser, usersCtrl.update);

router.use('/:nickname/emails', emailsRouter);
router.use('/:nickname/friends', friendsRouter);

module.exports = router;
