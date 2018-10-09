const { Router } = require('express');
const { categoriesCtrl } = require('../controllers');

const router = Router();

// Post category
router.post('/', categoriesCtrl.create);

// Get all categories
router.get('/', categoriesCtrl.getAll);

// Get category by Id
router.get('/:categoryId', categoriesCtrl.get);

// Put category
router.put('/:categoryId', categoriesCtrl.update);

// Delete category
router.delete('/:categoryId', categoriesCtrl.delete);

module.exports = router;
