const { Router } = require('express');
const { categoriesCtrl } = require('../controllers');
const { rules, defaultValues } = require('../middlewares');

const router = Router();

// Validation param categoryId
router.use('/:categoryId', rules.paramsCategories);

// Create category
router.post('/', rules.createCategory, categoriesCtrl.create);

// Get all categories
router.get('/', rules.getAllElements, categoriesCtrl.getAll);

// Get category
<<<<<<< HEAD
router.get('/:categoryId', rules.paramsCategory, categoriesCtrl.get);
=======
router.get('/:categoryId', categoriesCtrl.get);
>>>>>>> 7475df73fd8ec6668b15e7d525e4c0b5d23789a7

// Put category
router.patch('/:categoryId', rules.updateCategory, categoriesCtrl.update);

// Delete category
router.delete('/:categoryId', categoriesCtrl.delete);

module.exports = router;
