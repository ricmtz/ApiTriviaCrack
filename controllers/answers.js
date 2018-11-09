const { AnswersORM } = require('../orm');

class AnswersCtrl {
    // FIXME En los metodos getAll se debe permitir paginado y filtrado
    /**
     * This function request to the data base all the answers
     * associetes with a certain game.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.params.gameId Game id.
     * @param {Number} req.query.page Page number.
     */
    async getAll(req, res) {
        await AnswersORM.getAll(req.params.gameId, req.query.page)
            .then((ans) => {
                res.status(200).send({
                    data: ans,
                    total: ans.length,
                });
            })
            .catch((err) => { res.status(404).send({ error: err.message }); });
    }

    /**
     * This function request to the data base all the information
     * of a certain answer associate with a certain game.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.params.gameId Game id.
     * @param {Number} req.params.answerId Question id.
     */
    async get(req, res) {
        await AnswersORM.get(req.params.gameId, req.params.answerId)
            .then((ans) => { res.status(200).send({ data: ans }); })
            .catch((err) => { res.status(404).send({ error: err.message }); });
    }

    /**
     * This function request to the data base create
     * an answer with the given data.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.params.gameId Game id.
     * @param {Number} req.params.answerId Question id.
     * @param {Number} req.body.player User id.
     * @param {String} req.body.option Option selected.
     * @param {Boolean} req.body.correct Evaluation answer.
     */
    async create(req, res) {
        const data = {
            game: req.params.gameId,
            question: req.params.answerId,
            player: req.body.player,
            option: req.body.option,
            correct: req.body.correct,
        };
        await AnswersORM.create(data)
            .then((ans) => { res.status(200).send({ data: ans }); })
            .catch((err) => { res.status(404).send({ error: err.message }); });
    }

    /**
     * This function request to the data base update a certain
     * answer with the given data.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.params.gameId Game id.
     * @param {Number} req.params.answerId Question id.
     * @param {Number} req.body.player User id.
     * @param {String} req.body.option Option selected.
     * @param {Boolean} req.body.correct Evaluation answer.
     */
    async update(req, res) {
        const data = {
            game: req.params.gameId,
            question: req.params.answerId,
            player: req.body.player,
            option: req.body.selectedoption,
        };
        await AnswersORM.update(req.params.gameId, req.params.answerId, data)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ error: err.message }); });
    }

    /**
     * This function request to the data base delete a
     * certain answer associate with a certain game
     * an a question.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.params.gameId Game id.
     * @param {Number} req.params.answerId Question id
     */
    async delete(req, res) {
        await AnswersORM.delete(req.params.gameId, req.params.answerId)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ error: err.message }); });
    }
}

module.exports = new AnswersCtrl();
