const { Router } = require('express');
const { categoriesCtrl } = require('../controllers');
const { rules } = require('../middlewares');

const router = Router();

// Create category
router.post('/', rules.createCategory, categoriesCtrl.create);

// Get all categories
router.get('/', categoriesCtrl.getAll);

// Get category
// FIXME Se tiene que validar el parametro :categoryId que sea un identificador valido, ejem: un numero en cierto rango
router.get('/:categoryId', categoriesCtrl.get);

// Put category
// FIXME Se tiene que validar el parametro :categoryId que sea un identificador valido, ejem: un numero en cierto rango
router.patch('/:categoryId', rules.updateCategory, categoriesCtrl.update);

// Delete category
// FIXME Se tiene que validar el parametro :categoryId que sea un identificador valido, ejem: un numero en cierto rango
router.delete('/:categoryId', categoriesCtrl.delete);

module.exports = router;
