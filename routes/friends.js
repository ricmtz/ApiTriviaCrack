const { Router } = require('express');
const { friendsCtrl } = require('../controllers');
const { rules } = require('../middlewares');

const router = Router({ mergeParams: true });

// Validation param friendNickname
router.use('/:friendNickname', rules.paramsFriends);

// Get all friends.
router.get('/', rules.paramsUser, friendsCtrl.getAll);

// Add friend
router.post('/', rules.createFriend, friendsCtrl.create);

// Remove friend
router.delete('/:friendNickname', friendsCtrl.delete);

module.exports = router;
