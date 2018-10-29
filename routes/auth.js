const { Router } = require('express');
const { rules, auth } = require('../middlewares');

const router = Router({ mergeParams: true });

router.post('/register', rules.createUser, auth.register);
router.post('/login', auth.login);
router.get('/logout', auth.logout);


module.exports = router;
