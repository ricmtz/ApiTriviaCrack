const { GamesORM } = require('../orm');

// FIXME Todos los métodos deben estar documentados

class GamesQuestionsCtrl {
    // FIXME En los metodos getAll se debe permitir paginado y filtrado
    async getAll(req, res) {
        await GamesORM.getAllGamesQuestions(req.params.gameId, req.query.page)
            .then((ans) => {
                res.status(200).send({
                    data: ans,
                    total: ans.length,
                });
            })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async get(req, res) {
        await GamesORM.getGameQuestion(req.params.gameId, req.params.questionId)
            .then((ans) => { res.status(200).send({ data: ans }); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async create(req, res) {
        const data = {
            game: req.params.gameId,
            question: req.params.questionId,
            player: req.body.player,
            option: req.body.option,
            correct: req.body.correct,
        };
        await GamesORM.addAnswer(data)
            .then((ans) => { res.status(200).send({ data: ans }); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async update(req, res) {
        const data = {
            game: req.params.gameId,
            question: req.params.questionId,
            player: req.body.player,
            option: req.body.selectedoption,
        };
        console.log(data);
        await GamesORM.updateGameQuestion(req.params.gameId, req.params.questionId, data)
            .then((ans) => { res.status(204).send() })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    async delete(req, res) {
        await GamesORM.deleteGameQuestion(req.params.gameId, req.params.questionId)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }) });
    }
}

module.exports = new GamesQuestionsCtrl();
