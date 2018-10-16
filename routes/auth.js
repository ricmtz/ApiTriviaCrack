const { Router } = require('express');
const { rules, defaultValues, auth } = require('../middlewares');

const router = Router();

router.post('/register', [rules.createUser, defaultValues.defaultUser], auth.register);
router.post('/login', auth.login);
router.get('/logout', auth.logout);


module.exports = router;
