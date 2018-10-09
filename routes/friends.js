const { Router } = require('express');
const { friendsCtrl } = require('../controllers');

const router = Router({ mergeParams: true });

// Get all friends.
router.get('/', friendsCtrl.getAll);

// Add friend
router.post('/', friendsCtrl.create);

// Remove friend
router.delete('/:friend', friendsCtrl.delete);

module.exports = router;
