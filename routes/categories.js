const { Router } = require('express');
const { categoriesCtrl } = require('../controllers');
const middlewares = require('../middlewares');

const router = Router();

// Post category
router.post('/', middlewares.rules.createCategory, categoriesCtrl.create);

// Get all categories
router.get('/', categoriesCtrl.getAll);

// Get category by Id
router.get('/:categoryId', categoriesCtrl.get);

// Put category
router.patch('/:categoryId', middlewares.rules.updateCategory, categoriesCtrl.update);

// Delete category
router.delete('/:categoryId', categoriesCtrl.delete);

module.exports = router;
