
class Game {
    /**
     * Cosntructor function to Game.
     * @param {Object} obj Values of the Game.
     * @param {Number} obj.id Game id
     * @param {Number} obj.player1 Player 1 id.
     * @param {Number} obj.player2 Player 2 id.
     * @param {Number} obj.scoreplayer1 Game score player 1.
     * @param {Number} obj.scoreplayer2 Game score player 2.
     * @param {Date} obj.createdate Creation date.
     * @param {Boolean} obj.finished Finisched game status.
     * @param {Boolean} obj.deleted Game deleted status.
     */
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

    /**
     * This function returns the game id.
     * @returns {Number} Game id.
     */
    getId() {
        return this.id;
    }

    /**
     * This function returns the id player1 or
     * nickname player1.
     * @returns {Number|String} Player1 id or player1 nickname.
     */
    getPlayer1() {
        return this.player1;
    }

    /**
     * This function returns the id player2 or
     * nickname player2.
     * @returns {Number|String} Player2 id or player2 nickname.
     */
    getPlayer2() {
        return this.player2;
    }

    /**
     * This function returns an array with the id or nicknames
     * of the players.
     * @returns {Array} Array with the players id or nicknames.
     */
    getPlayers() {
        return [this.player1, this.player2];
    }

    /**
     * This function returns the id or nickname of the
     * player with more score in the game.
     * @returns {Number|String} Player id or player nickname.
     */
    getWinner() {
        return this.scoreplayer1 > this.scoreplayer2 ? this.player1 : this.player2;
    }

    /**
     * This function returns the id or nickname of the
     * player with less score in the game.
     * @returns {Number|String} Player id or player nickname.
     */
    getLoser() {
        return this.scoreplayer1 > this.scoreplayer2 ? this.player2 : this.player1;
    }

    /**
     * This function returns the player1 score.
     * @returns {Number} Player1 score.
     */
    getScoreplayer1() {
        return this.scoreplayer1;
    }

    /**
     * This function returns the player2 score.
     * @returns {Number} Player2 score.
     */
    getScoreplayer2() {
        return this.scoreplayer2;
    }

    /**
     * This function returns the date when
     * this games was created.
     * @returns {Date} Createdate game.
     */
    getCreatedate() {
        return this.createdate;
    }

    /**
     * This functions returns a boolean than
     * indicates whether the game has finished or not
     * @returns {Boolean} Finished game.
     */
    getFinished() {
        return this.finished;
    }

    /**
     * This function returns a boolean that
     * idicates wheter the game has been deleted
     * or not
     */
    getDeleted() {
        return this.deleted;
    }

    /**
     * This fucntion set the id to the game
     * if the id is not undefined.
     * @param {Number} id Game id.
     */
    setId(id) {
        if (id !== undefined) this.id = id;
    }

    /**
     * This function set the player to the game
     * if the player is not undefined.
     * @param {Number|String} player Player1 id or player1 nickname.
     */
    setPlayer1(player) {
        if (player !== undefined) this.player1 = player;
    }

    /**
     * This function set the player to the game
     * if the player is not undefined.
     * @param {Number|String} player Player2 id or player2 nickname.
     */
    setPlayer2(player) {
        if (player !== undefined) this.player2 = player;
    }

    /**
     * This function set the count of correct ansers to the
     * player 1 if the count is not undefined.
     * @param {Number} count Count of correct answers.
     */
    setScoreplayer1(count) {
        if (count !== undefined) this.scoreplayer1 = count;
    }

    /**
     * This function set the count of correct ansers to the
     * player 2 if the count is not undefined.
     * @param {Number} count Count of correct answers.
     */
    setScoreplayer2(count) {
        if (count !== undefined) this.scoreplayer2 = count;
    }

    /**
     * This function set the creation date to the game
     * if the date is not undefined.
     * @param {Date} date Creation date.
     */
    setCreatedate(date) {
        if (date !== undefined) this.createdate = date;
    }

    /**
     * This function set the finished status game
     * if the value is not undefined.
     * @param {Boolean} finished Finished status game.
     */
    setFinished(finished) {
        if (finished !== undefined) this.finished = finished;
    }

    /**
     * This functions set the game deleted statsus
     * if the value is not undefined.
     * @param {Boolean} deleted Game deleted status.
     */
    setDeleted(deleted) {
        if (deleted !== undefined) this.deleted = deleted;
    }
}

module.exports = Game;
