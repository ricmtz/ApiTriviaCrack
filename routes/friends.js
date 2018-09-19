const { Router } = require('express');
const { friendsCtrl } = require('../controllers');

const router = Router();

router.get('/', friendsCtrl.getAll);

router.get('/:user_1/:user_2', friendsCtrl.get);

router.post('/', friendsCtrl.create);

router.delete('/:user_1/:user_2', friendsCtrl.delete);

router.patch('/:user_1/:user_2', friendsCtrl.update);

module.exports = router;
