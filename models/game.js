const db = require('../db');

class Game {
    constructor(id, player1, player2, countAnswersPlayer1, countAnswersPlayer2) {
        this.id = id;
        this.player1 = player1;
        this.player2 = player2;
        this.countAnswersPlayer1 = countAnswersPlayer1;
        this.countAnswersPlayer2 = countAnswersPlayer2;
    }

    save() {
        db.insert(this);
    }
}

module.exports = Game;
