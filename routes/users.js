const express = require('express');
const { usersCtrl } = require('../controllers');

const router = express.Router();

// List all users.
router.get('/', usersCtrl.getAll);

// Find users.
router.get('/:userId', usersCtrl.get);

// Create users.
router.post('/', usersCtrl.create);

// Delete users.
router.delete('/:userId', usersCtrl.delete);

// Update users.
router.patch('/:userId', usersCtrl.update);


module.exports = router;
