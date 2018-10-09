const express = require('express');
const { emailsCtrl } = require('../controllers');
const { rules, defaultValues } = require('../middlewares');

const router = express.Router({ mergeParams: true });

// Get all emails
router.get('/', emailsCtrl.getAll);

// Add email
router.post('/', [rules.createEmail, defaultValues.defaultEmail], emailsCtrl.create);

// Update email
router.patch('/:emailId', rules.updateEmail, emailsCtrl.update);

// Remove email
router.delete('/:emailId', rules.paramsEmails, emailsCtrl.delete);

module.exports = router;
