const { UsersORM } = require('../orm');

class Game {
    constructor({
        id, player1, player2, countAnswersPlayer1, countAnswersPlayer2, createDate,
        finished, deleted,
    }) {
        this.id = id;
        this.player1 = UsersORM.get(player1);
        this.player2 = UsersORM.get(player2);
        this.countAnswersPlayer1 = countAnswersPlayer1;
        this.countAnswersPlayer2 = countAnswersPlayer2;
        this.createDate = createDate;
        this.finished = finished;
        this.deleted = deleted;
    }

    getId() {
        return this.id;
    }

    getPlayers() {
        return [this.player1, this.player2];
    }

    getWinner() {
        return this.countAnswersPlayer1 > this.countAnswersPlayer2 ? this.player1 : this.player2;
    }

    getLoser() {
        return this.countAnswersPlayer1 > this.countAnswersPlayer2 ? this.player2 : this.player1;
    }

    getCreateDate() {
        return this.createDate;
    }

    getFinished() {
        return this.finished;
    }

    getDeleted() {
        return this.deleted;
    }

    setPlayer1(player) {
        this.player1 = player;
    }

    setPlayer2(player) {
        this.player2 = player;
    }

    setCountAnswersPlayer1(count) {
        this.countAnswersPlayer1 = count;
    }

    setCountAnswersPlayer2(count) {
        this.countAnswersPlayer2 = count;
    }

    setCreateDate(createDate) {
        this.createDate = createDate;
    }

    setFinished(finished) {
        this.finished = finished;
    }

    setDeleted(deleted) {
        this.deleted = deleted;
    }
}

module.exports = Game;
