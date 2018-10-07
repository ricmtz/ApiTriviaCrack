const express = require('express');
const { usersCtrl } = require('../controllers');

const router = express.Router({ mergeParams: true });

// Get all emails
router.get('/', usersCtrl.getAllEmails);

// Add email
router.post('/', usersCtrl.addEmail);

// Update email
router.put('/:emailUsr', usersCtrl.updateEmail);

// Remove email
router.delete('/', usersCtrl.removeEmail);

module.exports = router;
