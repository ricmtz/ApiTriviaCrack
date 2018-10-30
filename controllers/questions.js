const { QuestionsORM } = require('../orm');

class QuestionsCtrl {
    /**
     * Constructor function to QuestionCtrl.
     */
    constructor() {
        this.create = this.create.bind(this);
    }

    /**
     * This function request to the data base all the
     * questions stored.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.query.page Page number.
     */
    async getAll(req, res) {
        await QuestionsORM.getAll(req.query.page)
            .then((quest) => {
                res.status(200).send({
                    data: quest,
                    total: quest.length,
                });
            })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    /**
     * This function request to the data base all the
     * information associated with a certain question.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.params.question Question id.
     */
    async get(req, res) {
        await QuestionsORM.get(req.params.question)
            .then((quest) => { res.status(200).send({ data: quest }); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    /**
     * This function requesto to the data base create a
     * questions with the given data.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.body.category Category id.
     * @param {String} req.body.question Question.
     * @param {String} req.body.option1 First option.
     * @param {String} req.body.option2 Second option.
     * @param {String} req.body.optioncorrect Correct option.
     * @param {Number} req.body.userid User id.
     */
    async create(req, res) {
        this.setDefaultValues(req);
        await QuestionsORM.create(req.body)
            .then((quest) => { res.status(200).send({ data: quest }); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    /**
     * This function request to the data base an update of}
     * a certain question, replacing the data with the given data.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.params.question Question id.
     * @param {Number} req.body.category Category id.
     * @param {String} req.body.question Question.
     * @param {String} req.body.option1 First option.
     * @param {String} req.body.option2 Second option.
     * @param {String} req.body.optioncorrect Correct option.
     * @param {String} req.body.approved Approved status.
     */
    async update(req, res) {
        await QuestionsORM.update(req.params.question, req.body)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    /**
     * This function request to the data base delete a
     * certain question.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.params.question Question id.
     */
    async delete(req, res) {
        await QuestionsORM.delete(req.params.question)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    /**
     * This function set the default values for approved,
     * delted and createdate for a question.
     * @param {Object} req Express request object.
     */
    setDefaultValues(req) {
        req.body.approved = false;
        req.body.deleted = false;
        req.body.createdate = new Date().toISOString();
    }
}

module.exports = new QuestionsCtrl();
