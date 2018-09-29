const db = require('../DB');

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

    get id() {
        return this.id;
    }

    get players() {
        return [this.player1, this.player2];
    }

    get winner() {
        return this.countAnswersPlayer1 > this.countAnswersPlayer2 ? this.player1 : this.player2;
    }

    get loser() {
        return this.countAnswersPlayer1 > this.countAnswersPlayer2 ? this.player2 : this.player1;
    }

    set player1(player) {
        this.player1 = player;
    }

    set player2(player) {
        this.player2 = player;
    }

    set countAnswersPlayer1(count) {
        this.countAnswersPlayer1 = count;
    }

    set countAnswersPlayer2(count) {
        this.countAnswersPlayer2 = count;
    }
}

module.exports = Game;
