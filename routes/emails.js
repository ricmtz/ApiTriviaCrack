const express = require('express');
const { usersCtrl } = require('../controllers');

const router = express.Router();

// Get all emails
router.get('/:nickname/emails', usersCtrl.getEmails);

// Add email
router.post('/:nickname/emails', usersCtrl.addEmail);

// Update email
router.post('/:nickname/emails/:emailUsr', usersCtrl.updateEmail);
// Remove email
router.delete('/:nickname/emails', usersCtrl.removeEmail);

module.exports = router;
