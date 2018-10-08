const express = require('express');
const { emailsCtrl } = require('../controllers');

const router = express.Router({ mergeParams: true });

// Get all emails
router.get('/', emailsCtrl.getAll);

// Add email
router.post('/', emailsCtrl.create);

// Update email
router.patch('/', emailsCtrl.update);

// Remove email
router.delete('/', emailsCtrl.delete);

module.exports = router;
