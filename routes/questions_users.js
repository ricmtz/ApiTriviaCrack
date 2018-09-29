const { Router } = require('express');
const { usersCtrl } = require('../controllers');

const router = Router();

// List all questions users.
router.get('/:nickname/questions_users', usersCtrl.getAllQuestions);

// Find question user.
router.get('/:nickname/:questionId/', usersCtrl.getQuestion);

// Create question user
router.post('/:nickname/questions_users', usersCtrl.createdQuestion);

// Delete question user
router.delete('/:nickname/:questionId', usersCtrl.removeQuestion);

// Update question user.
router.patch('/:nickname/:questionId', usersCtrl.updateQuestion);

module.exports = router;
