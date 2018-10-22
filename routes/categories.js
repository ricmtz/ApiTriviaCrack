const { Router } = require('express');
const { categoriesCtrl } = require('../controllers');
const { rules, defaultValues } = require('../middlewares');

const router = Router();

// Post category
router.post('/', [rules.createCategory, defaultValues.defaultCategory], categoriesCtrl.create);

// Get all categories
router.get('/', [rules.getAllElements, defaultValues.defaultPage], categoriesCtrl.getAll);

// Get category
router.get('/:categoryId', rules.paramsCategory, categoriesCtrl.get);

// Put category
// FIXME Se tiene que validar el parametro :categoryId que sea un identificador valido, ejem: un numero en cierto rango
router.patch('/:categoryId', rules.updateCategory, categoriesCtrl.update);

// Delete category
// FIXME Se tiene que validar el parametro :categoryId que sea un identificador valido, ejem: un numero en cierto rango
router.delete('/:categoryId', categoriesCtrl.delete);

module.exports = router;
