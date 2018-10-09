const { Router } = require('express');
const { categoriesCtrl } = require('../controllers');

const router = Router();

// Post category
router.post('/', categoriesCtrl.create);

// Get all categories
router.get('/', categoriesCtrl.getAll);

// Get category
router.get('/:category', categoriesCtrl.get);

// Update category.
router.patch('/:category', categoriesCtrl.update);

// Delete category
router.delete('/:category', categoriesCtrl.delete);

module.exports = router;
