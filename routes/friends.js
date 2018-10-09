const { Router } = require('express');
const { friendsCtrl } = require('../controllers');
const { rules, defaultValues } = require('../middlewares');

const router = Router({ mergeParams: true });

// Get all friends.
router.get('/', rules.paramsUser, friendsCtrl.getAll);

// Add friend
router.post('/', [rules.createFriend, defaultValues.defaultFriend], friendsCtrl.create);

// Remove friend
router.delete('/', rules.paramsFriends, friendsCtrl.delete);

module.exports = router;
