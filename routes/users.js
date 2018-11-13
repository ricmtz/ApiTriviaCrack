const express = require('express');
const multer = require('multer');
const emailsRouter = require('./emails');
const friendsRouter = require('./friends');
const { usersCtrl } = require('../controllers');
const { rules, auth, file } = require('../middlewares');

const router = express.Router();
const upload = multer({ dest: 'temp/' });

router.use(auth.session);

// Validation param nickname
router.use('/:nickname', rules.paramsUser);

// List all users.
router.get('/', [rules.getAllElements, auth.havePermissions], usersCtrl.getAll);

// Find users.
router.get('/:nickname', auth.havePermissions, usersCtrl.get);

// Create users.
router.post('/',
    [upload.single('avatar'), rules.createUser,
        auth.havePermissions, file.changeFolder],
    usersCtrl.create);

// Delete users.
router.delete('/:nickname', auth.havePermissions, usersCtrl.delete);

// Update users.
router.patch('/:nickname',
    [upload.single('avatar'), auth.havePermissions,
        rules.updateUser, file.changeFolder],
    usersCtrl.update);

router.use('/:nickname/emails', emailsRouter);
router.use('/:nickname/friends', friendsRouter);

module.exports = router;
