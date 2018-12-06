const express = require('express');
const multer = require('multer');
const emailsRouter = require('./emails');
const friendsRouter = require('./friends');
const { usersCtrl } = require('../controllers');
const { rules, auth, file } = require('../middlewares');

const router = express.Router();
const upload = multer({ dest: 'temp/' });

// Validation param nickname
router.use('/:nickname', auth.session, rules.paramsUser);

// List all users.
router.get('/',
    [rules.getAllElements, rules.getAllConv,
        rules.queryUser, rules.userConv,
        rules.userScores, auth.session,
        auth.havePermissions], usersCtrl.getAll);

// Find users.
router.get('/:nickname', [auth.session, auth.havePermissions], usersCtrl.get);

// Create users.
router.post('/', rules.createUser, usersCtrl.create);

// Delete users.
router.delete('/:nickname', [auth.session, auth.havePermissions], usersCtrl.delete);

// Update users.
router.patch('/:nickname',
    [auth.session, upload.single('avatar'), auth.havePermissions,
        rules.updateUser, file.changeFolder],
    usersCtrl.update);

router.use('/:nickname/emails', emailsRouter);
router.use('/:nickname/friends', friendsRouter);

module.exports = router;
