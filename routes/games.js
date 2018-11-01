const { Router } = require('express');
const { gamesCtrl } = require('../controllers');
const answersRouter = require('./answers');
const { rules, auth } = require('../middlewares');

const router = Router();

router.use(auth.session);

// Validation param gameId
router.use('/:gameId', rules.paramsGames);

// Post game
router.post('/', [rules.createGame, auth.havePermissions], gamesCtrl.create);

// Get all games
router.get('/', auth.havePermissions, gamesCtrl.getAll);

// Get game by Id
router.get('/:gameId', auth.havePermissions, gamesCtrl.get);

// Put game
router.patch('/:gameId', auth.havePermissions, rules.updateGame, gamesCtrl.update);

// Delete game
router.delete('/:gameId', auth.havePermissions, gamesCtrl.delete);

router.use('/:gameId/answers', answersRouter);

module.exports = router;
