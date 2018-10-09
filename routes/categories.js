const { Router } = require('express');
const { categoriesCtrl } = require('../controllers');
const { rules, defaultValues } = require('../middlewares');

const router = Router();

// Post category
router.post('/', [rules.createCategory, defaultValues.defaultCategory], categoriesCtrl.create);

// Get all categories
router.get('/', categoriesCtrl.getAll);

// Get category by Id
router.get('/:categoryId', categoriesCtrl.get);

// Put category
router.patch('/:categoryId', rules.updateCategory, categoriesCtrl.update);

// Delete category
router.delete('/:categoryId', categoriesCtrl.delete);

module.exports = router;
