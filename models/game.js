class Game {
    constructor({
        id, player1, player2, scoreplayer1, scoreplayer2,
        createdate, finished, deleted,
    }) {
        this.setId(id);
        this.setPlayer1(player1);
        this.setPlayer2(player2);
        this.setScoreplayer1(scoreplayer1);
        this.setScoreplayer2(scoreplayer2);
        this.setCreatedate(createdate);
        this.setFinished(finished);
        this.setDeleted(deleted);
    }

    getId() {
        return this.id;
    }

    getPlayers() {
        return [this.player1, this.player2];
    }

    getWinner() {
        return this.scoreplayer1 > this.scoreplayer2 ? this.player1 : this.player2;
    }

    getLoser() {
        return this.scoreplayer1 > this.scoreplayer2 ? this.player2 : this.player1;
    }

    getCreatedate() {
        return this.createdate;
    }

    getFinished() {
        return this.finished;
    }

    getDeleted() {
        return this.deleted;
    }

    setId(id) {
        if (id !== undefined) this.id = id;
    }

    setPlayer1(player) {
        if (player !== undefined) this.player1 = player;
    }

    setPlayer2(player) {
        if (player !== undefined) this.player2 = player;
    }

    setScoreplayer1(count) {
        if (count !== undefined) this.scoreplayer1 = count;
    }

    setScoreplayer2(count) {
        if (count !== undefined) this.scorePlayer2 = count;
    }

    setCreatedate(date) {
        if (date !== undefined) this.createdate = date;
    }

    setFinished(finished) {
        if (finished !== undefined) this.finished = finished;
    }

    setDeleted(deleted) {
        if (deleted !== undefined) this.deleted = deleted;
    }
}

module.exports = Game;
