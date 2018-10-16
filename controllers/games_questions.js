const { GamesORM } = require('../orm');

// FIXME Todos los métodos deben estar documentados

class GamesQuestionsCtrl {
    // FIXME En los metodos getAll se debe permitir paginado y filtrado
    static async getAll(req, res) {
        const result = await GamesORM.getAllGamesQuestions(req.params.gameId);
        const json = {
            data: result,
            total: result.length,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
    }

    static async get(req, res) {
        const result = await GamesORM.getGameQuestion(req.params.gameId, req.params.questionId);
        const json = {
            data: result,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
    }

    static async create(req, res) {
        const data = {
            game: req.params.gameId,
            question: req.body.question,
            player: req.body.player,
            option: req.body.option,
        };
        const result = await GamesORM.addAnswer(data);
        const finish = await GamesORM.finishGame(data);
        const json = {
            data: result,
            finish_game: finish,
        };
        if (result.length === 0) res.status(404);
        res.status(200).send(json);
    }

    static async update(req, res) {
        const data = {
            id: req.params.questionId,
            game: req.params.gameId,
            question: req.body.question,
            player: req.body.player,
            selectedoption: req.body.selectedoption,
        };
        const result = await GamesORM.updateGameQuestion(data);
        const json = {
            response: 'Ok',
            data: result,
        };
        res.status(200).send(json);
    }

    static async delete(req, res) {
        const json = {
            response: 'Ok',
            data: `Question ${req.params.questionId} removed from ${req.params.gameId}`,
        };
        res.status(200).send(json);
    }
}

module.exports = GamesQuestionsCtrl;
