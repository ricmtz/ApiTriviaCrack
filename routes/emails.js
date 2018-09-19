const express = require('express');
const emailsCtrl = require('../controllers/emails');

const router = express.Router();

// List all users.
router.get('/', emailsCtrl.getAll);

// Find users.
router.get('/:userId', emailsCtrl.get);

// Create users.
router.post('/', emailsCtrl.create);

// Delete users.
router.delete('/:userId', emailsCtrl.delete);

// Update users.
router.patch('/:userId', emailsCtrl.update);

module.exports = router;
