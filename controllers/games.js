const { GamesORM } = require('../orm');

class GamesCtrl {
    /**
     * Constructor of GamesCtrl.
     */
    constructor() {
        this.create = this.create.bind(this);
    }

    // FIXME En los metodos getAll se debe permitir paginado y filtrado
    /**
     * This function request to the data base all the games
     * stored.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.query.page Page number.
     */
    async getAll(req, res) {
        await GamesORM.getAll(req.query.page, req.query)
            .then((game) => {
                res.status(200).send({
                    data: game,
                    total: game.length,
                });
            })
            .catch((err) => { res.status(404).send({ error: err.message }); });
    }

    /**
     * This function request to the data base all the information
     * associate with a certain game.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.params.gameId Game id.
     */
    async get(req, res) {
        await GamesORM.get(req.params.gameId)
            .then((game) => { res.status(200).send({ data: game }); })
            .catch((err) => { res.status(404).send({ error: err.message }); });
    }

    /**
     * This function request to the data base create a game
     * with the given data.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {String} req.params.player1 User nickname of the player 1.
     * @param {String} req.params.player2 User nickname of the player 2.
     */
    async create(req, res) {
        this.setDefaultValues(req);
        await GamesORM.create(req.body)
            .then((game) => { res.status(200).send({ data: game }); })
            .catch((err) => { res.status(404).send({ error: err.message }); });
    }

    /**
     * This function request to the data base an update of a
     * certain game, replacing the data with the given data.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.params.gameId Game id.
     * @param {String} req.params.player1 User nickname of the player 1.
     * @param {String} req.params.player2 User nickname of the player 2.
     * @param {Number} req.params.scoreplayer1 Game score of the player 1.
     * @param {Number} req.params.scoreplayer2 Game score of the player 2.
     */
    async update(req, res) {
        await GamesORM.update(req.params.gameId, req.body)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ error: err.message }); });
    }

    /**
     * This function request to the data base delete a
     * certain game.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.params.gameId Game id.
     */
    async delete(req, res) {
        await GamesORM.delete(req.params.gameId)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ error: err.message }); });
    }

    /**
     * This function set the deafult properties to answarsplayer1,
     * answersplayer2, createdate, finished and delete for a game.
     * @param {Object} req Express request object.
     * @param {Number} req.body.answersplayer1 Total answers response by the user
     * @param {Number} req.body.answersplayer2 Total answers response by the user
     * @param {Date} req.body.createdate Game creation date.
     * @param {Boolean} req.body.finished Game status.
     * @param {Boolean} req.body.deleted Game delete property.
     */
    setDefaultValues(req) {
        req.body.answersplayer1 = -1;
        req.body.answersplayer2 = -1;
        req.body.createdate = new Date().toISOString();
        req.body.finished = false;
        req.body.deleted = false;
    }
}

module.exports = new GamesCtrl();
