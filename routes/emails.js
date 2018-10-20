const express = require('express');
const { emailsCtrl } = require('../controllers');
const { rules } = require('../middlewares');

const router = express.Router({ mergeParams: true });

// Get all emails
router.get('/', emailsCtrl.getAll);

// Add email
router.post('/', rules.checkEmail, emailsCtrl.create);

// Update email
router.patch('/', rules.updateEmail, emailsCtrl.update);

// Remove email
router.delete('/', rules.checkEmail, emailsCtrl.delete);

module.exports = router;
