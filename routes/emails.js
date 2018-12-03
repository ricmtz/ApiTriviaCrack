const express = require('express');
const { emailsCtrl } = require('../controllers');
const { rules, auth } = require('../middlewares');

const router = express.Router({ mergeParams: true });

router.use(auth.session);

// Get all emails
router.get('/', [rules.queryEmail, auth.havePermissions], emailsCtrl.getAll);

// Add email
router.post('/', [rules.checkEmail, auth.havePermissions], emailsCtrl.create);

// Update email
router.patch('/', [rules.updateEmail, auth.havePermissions], emailsCtrl.update);

// Remove email
router.delete('/', [rules.checkEmail, auth.havePermissions], emailsCtrl.delete);

module.exports = router;
