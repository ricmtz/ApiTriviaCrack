const { Router } = require('express');
const { usersCtrl } = require('../controllers');

const router = Router();

// Get all friends.
router.get('/:nickname/friends', usersCtrl.getFriends);

// Add friend
router.post('/:nickname/friends', usersCtrl.addFriend);

// Remove friend
router.delete('/:nickname/friends', usersCtrl.removeFriend);

module.exports = router;
