const { Router } = require('express');
const { questionsUsersCtrl } = require('../controllers');

const router = Router();

// List all questions users.
router.get('/', questionsUsersCtrl.getAll);

// Find question user.
router.get('/:question/:user', questionsUsersCtrl.get);

// Create question user
router.post('/', questionsUsersCtrl.create);

// Delete question user
router.delete('/:question/:user', questionsUsersCtrl.delete);

// Update question user.
router.patch('/:question/:user', questionsUsersCtrl.update);

module.exports = router;
