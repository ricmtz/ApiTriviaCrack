
class Answer {
    /**
     * Cosntructor function to Answer.
     * @param {Object} obj Values of the answer.
     * @param {Number} obj.id Answer id.
     * @param {Number} obj.question Question id.
     * @param {Number} obj.player Player id.
     * @param {String} obj.option Option selected.
     * @param {Boolean} obj.correct Evaluation answer.
     */
    constructor({
        id, game, question, player, option, correct,
    }) {
        this.setId(id);
        this.setGame(game);
        this.setPlayer(player);
        this.setQuestion(question);
        this.setOption(option);
        this.setCorrect(correct);
    }

    /**
     * This function returns the id of the answer.
     * @returns {Number} Id of the answer.
     */
    getId() {
        return this.id;
    }

    /**
     * This function returns the game id.
     * @returns {Number} Game id.
     */
    getGame() {
        return this.game;
    }

    /**
     * This function return the player that response
     * this answer.
     * @returns {Number|String} Player id or player nickname.
     */
    getPlayer() {
        return this.player;
    }

    /**
     * This functions returns the questions associate to the
     * answer.
     * @returns {Number|String} Question id or question text.
     */
    getQuestion() {
        return this.question;
    }

    /**
     * This function returns the player selected option.
     * @returns {String} Option.
     */
    getOption() {
        return this.option;
    }

    /**
     * This function returns the evaluation of the answer.
     * @returns {Boolean} True if the answer is correct otherwise false.
     */
    getCorrect() {
        return this.correct;
    }

    /**
     * This function set the id to the answer if
     * this is not undefined.
     * @param {Number} id Answer id.
     */
    setId(id) {
        if (id !== undefined) this.id = id;
    }

    /**
     * This Function set the mage id to the answer
     * if this is not undefined.
     * @param {Number} game Game id.
     */
    setGame(game) {
        if (game !== undefined) this.game = game;
    }

    /**
     * This function set the id or nickname of the player to the answer
     * if this is not undefined.
     * @param {Number|String} player Player id or player nickname.
     */
    setPlayer(player) {
        if (player !== undefined) this.player = player;
    }

    /**
     * This functio set the id or question text to the answer
     * if this is not undefined.
     * @param {Number|String} question Question id or question text.
     */
    setQuestion(question) {
        if (question !== undefined) this.question = question;
    }

    /**
     * This function set the option selected to the answer
     * if this is not undefined.
     * @param {String} option Option selected.
     */
    setOption(option) {
        if (option !== undefined) this.option = option;
    }

    /**
     * This function set the result of the evaluation to answer
     * if this is not undefied.
     * @param {Boolean} correct Evaluation answer.
     */
    setCorrect(correct) {
        if (correct !== undefined) this.correct = correct;
    }
}

module.exports = Answer;
