const { Router } = require('express');
const { gamesCtrl } = require('../controllers');
const gamesQuestionsRouter = require('./games_questions');
const { rules, defaultValues } = require('../middlewares');

const router = Router();

// Post game
router.post('/', [rules.createGame, defaultValues.defaultGame], gamesCtrl.create);

// Get all games
router.get('/', gamesCtrl.getAll);

// Get game by Id
router.get('/:gameId', gamesCtrl.get);

// Put game
<<<<<<< HEAD
router.patch('/:gameId', gamesCtrl.update);
=======
router.patch('/:gameId', rules.updateGame, gamesCtrl.update);
>>>>>>> 4473cb491c1cc3ecd555b5b6a441fe6dcdfbf858

// Delete game
router.delete('/:gameId', gamesCtrl.delete);

<<<<<<< HEAD

=======
>>>>>>> 4473cb491c1cc3ecd555b5b6a441fe6dcdfbf858
router.use('/:gameId/games_questions', gamesQuestionsRouter);

module.exports = router;
