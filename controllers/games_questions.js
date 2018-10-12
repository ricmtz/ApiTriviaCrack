const { GamesORM } = require('../orm');

class GamesQuestionsCtrl {
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
        const json = {
            response: 'Ok',
            data: `Question ${req.params.questionId} from ${req.params.gameId}`,
        };
        res.status(200).send(json);
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
        const json = {
            response: 'Ok',
            data: `Question ${req.params.questionId} updated from ${req.params.gameId}`,
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
