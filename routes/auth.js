const { Router } = require('express');
// const { categoriesCtrl } = require('../controllers');
const middlewares = require('../middlewares');

const router = Router();

router.post('/register', middlewares.auth.resgister);
router.post('/login', middlewares.auth.login);
router.get('/logout', middlewares.auth.logout);


module.exports = router;
