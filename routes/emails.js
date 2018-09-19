const express = require('express');
const { emailsCtrl } = require('../controllers');

const router = express.Router();

// List all emails.
router.get('/', emailsCtrl.getAll);

// Find emails user.
router.get('/:userId', emailsCtrl.get);

// Create email.
router.post('/', emailsCtrl.create);

// Delete email.
router.delete('/:userId', emailsCtrl.delete);

// Update email.
router.patch('/:userId', emailsCtrl.update);

module.exports = router;
