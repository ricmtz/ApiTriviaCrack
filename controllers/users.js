const fs = require('fs');
const { UsersORM } = require('../orm');

class UsersCtrl {
    /**
     * This function request to the data base all the
     * users stored.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.query.page Page number.
     */
    async getAll(req, res) {
        await UsersORM.getAll(req.query)
            .then((usrs) => {
                res.status(200).send({
                    data: usrs.result,
                    total: usrs.result.length,
                    pages: usrs.pages,
                });
            })
            .catch((err) => { res.status(err.code).send({ error: err.message }); });
    }

    /**
     * This function request to the data base all the
     * information associate with a certain user.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.params.nickname
     */
    async get(req, res) {
        await UsersORM.getByNickname(req.params.nickname)
            .then((usr) => { res.status(200).send({ data: usr }); })
            .catch((err) => { res.status(404).send({ error: err.message }); });
    }

    /**
     * This function request to the data base create an
     * user with the given data.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {String} req.body.nickname User nickname.
     * @param {String} req.body.password User password.
     * @param {String} req.body.email User email.
     * @param {File} req.file File of avatar
     */
    async create(req, res) {
        await UsersORM.create(req.body)
            .then((usr) => { res.status(200).send({ data: usr }); })
            .catch((err) => { res.status(404).send({ error: err.message }); });
    }

    /**
     * This function request to the data base update a
     * certain user, replacing the data with the given data.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {String} req.params.nickname User nickname.
     * @param {String} req.body.nickname User nickname.
     * @param {String} req.body.password User password.
     * @param {String} req.body.email User email.
     * @param {String} req.body.avatar File name of the avatar.
     * @param {Boolean} req.body.admin Admin privileges.
     * @param {File} req.file File of avatar
     */
    async update(req, res) {
        await UsersORM.update(req.params.nickname, req.body)
            .then(() => { res.status(204).send(); })
            .catch((err) => {
                if (req.file !== undefined) {
                    fs.unlink(req.body.avatar);
                }
                res.status(404).send({ error: err.message });
            });
    }

    /**
     * This function request to the data base delete a
     * certain user.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {String} req.params.nickname User nickname.
     */
    async delete(req, res) {
        await UsersORM.delete(req.params.nickname)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ error: err.message }); });
    }
}

module.exports = new UsersCtrl();
