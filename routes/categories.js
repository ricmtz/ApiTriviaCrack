const { Router } = require('express');
const { categoriesCtrl } = require('../controllers');
const { rules } = require('../middlewares');

const router = Router();

// Validation param categoryId
router.use('/:categoryId', rules.paramsCategories);

// Create category
router.post('/', rules.createCategory, categoriesCtrl.create);

// Get all categories
router.get('/', [rules.getAllElements, defaultValues.defaultPage], categoriesCtrl.getAll);

// Get category
router.get('/:categoryId', rules.paramsCategory, categoriesCtrl.get);

// Put category
router.patch('/:categoryId', rules.updateCategory, categoriesCtrl.update);

// Delete category
router.delete('/:categoryId', categoriesCtrl.delete);

module.exports = router;
