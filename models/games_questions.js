const db = require('../DB');

class Games_Questions {
    constructor(id, game, question) {
        this.id = id;
        this.game = game;
        this.question = question;
    }

    save() {
        db.create(this);
    }

    getId() {
        return this.id;
    }

    getGame() {
        return this.game;
    }

    getQuestion() {
        return this.question;
    }

    setId(id) {
        this.id = id;
    }

    setGame(game) {
        this.game = game;
    }

    setQuestion(question) {
        this.question = question;
    }
}

module.exports = Games_Questions;
