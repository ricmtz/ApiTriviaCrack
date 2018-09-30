const { QuestionsORM } = require('../orm');

class GamesQuestions {
    constructor({ id, game, question }) {
        this.id = id;
        this.game = game;
        this.question = QuestionsORM.get(question);
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

module.exports = GamesQuestions;
