const { Router } = require('express');
const { categoriesCtrl } = require('../controllers');
const { rules, auth } = require('../middlewares');

const router = Router();

router.use(auth.session);

// Validation param categoryId
router.use('/:categoryId', rules.paramsCategories);

// Create category
router.post('/', [rules.createCategory, auth.havePermissions], categoriesCtrl.create);

// Get all categories
router.get('/', [rules.getAllElements, rules.queryCategory, auth.havePermissions], categoriesCtrl.getAll);

// Get category
router.get('/:categoryId', auth.havePermissions, categoriesCtrl.get);

// Put category
router.patch('/:categoryId', [rules.updateCategory, auth.havePermissions], categoriesCtrl.update);

// Delete category
router.delete('/:categoryId', auth.havePermissions, categoriesCtrl.delete);

module.exports = router;
