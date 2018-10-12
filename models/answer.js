class Answer {
    constructor({
        id, game, question, player, selectedoption, correct,
    }) {
        this.setId(id);
        this.setGame(game);
        this.setPlayer(player);
        this.setQuestion(question);
        this.setOption(selectedoption);
        this.setCorrect(correct);
    }

    getId() {
        return this.id;
    }

    getGame() {
        return this.game;
    }

    getPlayer() {
        return this.player;
    }

    getQuestion() {
        return this.question;
    }

    getOption() {
        return this.option;
    }

    getCorrect() {
        return this.correct;
    }

    setId(id) {
        if (id !== undefined) this.id = id;
    }

    setGame(game) {
        if (game !== undefined) this.game = game;
    }

    setPlayer(player) {
        if (player !== undefined) this.player = player;
    }

    setQuestion(question) {
        if (question !== undefined) this.question = question;
    }

    setOption(option) {
        if (option !== undefined) this.option = option;
    }

    setCorrect(correct) {
        if (correct !== undefined) this.correct = correct;
    }
}

module.exports = Answer;
