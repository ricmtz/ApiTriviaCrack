const { Router } = require('express');
const { friendsCtrl } = require('../controllers');
const { rules, auth } = require('../middlewares');

const router = Router({ mergeParams: true });

// Validation param friendNickname
router.use('/:friendNickname', rules.paramsFriends);

// Get all friends.
router.get('/', [rules.paramsUser, auth.havePermissions], friendsCtrl.getAll);

// Add friend
router.post('/', [rules.createFriend, auth.havePermissions], friendsCtrl.create);

// Remove friend
router.delete('/:friendNickname', auth.havePermissions, friendsCtrl.delete);

module.exports = router;
