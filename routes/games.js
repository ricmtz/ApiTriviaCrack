const { Router } = require('express');
const { gamesCtrl } = require('../controllers');

const router = Router();

// Post game
router.post('/', gamesCtrl.create);

// Get all games
router.get('/', gamesCtrl.getAll);

// Get game by Id
router.get('/:gameId', gamesCtrl.get);

// Put game
router.put('/:gameId', gamesCtrl.update);

// Delete game
router.delete('/:gameId', gamesCtrl.delete);

// Delete all games
router.delete('/', gamesCtrl.deleteAll);

module.exports = router;
