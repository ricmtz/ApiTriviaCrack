const { Router } = require('express');
const multer = require('multer');
const { categoriesCtrl } = require('../controllers');
const { rules, auth, file } = require('../middlewares');

const router = Router();
const upload = multer({ dest: 'temp/' });

router.use(auth.session);

// Validation param categoryId
router.use('/:categoryId', rules.paramsCategories);

// Create category
router.post('/',
    [upload.single('icon'), rules.createCategory,
        auth.havePermissions, file.changeFolder],
    categoriesCtrl.create);

// Get all categories
router.get('/', [rules.getAllElements, auth.havePermissions], categoriesCtrl.getAll);

// Get category
router.get('/:categoryId', auth.havePermissions, categoriesCtrl.get);

// Put category
router.patch('/:categoryId',
    [upload.single('icon'), rules.updateCategory,
        auth.havePermissions, file.changeFolder],
    categoriesCtrl.update);

// Delete category
router.delete('/:categoryId', auth.havePermissions, categoriesCtrl.delete);

module.exports = router;
