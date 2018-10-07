const { Router } = require('express');
const { usersCtrl } = require('../controllers');

const router = Router({ mergeParams: true });

// Get all friends.
router.get('/', usersCtrl.getAllFriends);

// Add friend
router.post('/', usersCtrl.addFriend);

// Remove friend
router.delete('/', usersCtrl.removeFriend);

module.exports = router;
