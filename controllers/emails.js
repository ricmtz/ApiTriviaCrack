const { EmailsORM } = require('../orm');

class EmailsCtrl {
    /**
     * This function request to the data base all the emails associates with
     * the given nickname.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {String} req.params.nickname User nickname.
     * @param {Number} req.query.page Page number.
     */
    async getAll(req, res) {
        await EmailsORM.getAll(req.params.nickname, req.query.page)
            .then((email) => {
                res.status(200).send({
                    data: email,
                    total: email.length,
                });
            })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    /**
     * This function request to the data base create an email, associating this
     * email with the user nickname.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {String} req.params.nickname User nickname.
     * @param {String} req.body.email Email that would be added.
     */
    async create(req, res) {
        await EmailsORM.create(req.params.nickname, req.body.email)
            .then((email) => { res.status(200).send({ data: email }); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    /**
     * This function request to the data base update a certain email
     * associated with an certain user with a new email.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {String} req.params.nickname User nickname
     * @param {String} req.body.oldEmail Old user email.
     * @param {String} req.body.newEmail New user email.
     */
    async update(req, res) {
        await EmailsORM.update(req.params.nickname, req.body.oldEmail, req.body.newEmail)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    /**
     * This function request to the data base delete a certain email
     * associated with a certain user.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {String} req.params.nickname User nickname
     * @param {String} req.body.email User email that would be deleted.
     */
    async delete(req, res) {
        await EmailsORM.delete(req.params.nickname, req.body.email)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }
}

module.exports = new EmailsCtrl();
