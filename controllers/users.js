const { UsersORM } = require('../orm');

class UsersCtrl {
    /**
     * Constructor function to UsersCtrl.
     */
    constructor() {
        this.create = this.create.bind(this);
    }

    /**
     * This function request to the data base all the
     * users stored.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.query.page Page number.
     */
    async getAll(req, res) {
        await UsersORM.getAll(req.query.page)
            .then((usrs) => {
                res.status(200).send({
                    data: usrs,
                    total: usrs.length,
                });
            })
            .catch((err) => { res.status(err.code).send({ data: err.message }); });
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
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    /**
     * This function request to the data base create an
     * user with the given data.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {String} req.body.nickname User nickname.
     * @param {String} req.body.password User password.
     * @param {String} req.body.email User email.
     */
    async create(req, res) {
        this.setDefaultValues(req);
        await UsersORM.create(req.body)
            .then((usr) => { res.status(200).send({ data: usr }); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
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
     */
    async update(req, res) {
        await UsersORM.update(req.params.nickname, req.body)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ data: err.message }); });
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
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    /**
     * This function set the default valuest to the attribs
     * admin, score, avatar, lastlogin, deleted and verified
     * for a user.
     * @param {Object} req Express request object.
     */
    setDefaultValues(req) {
        req.body.admin = false;
        req.body.score = 0;
        req.body.avatar = 'default.png';
        req.body.lastlogin = new Date().toISOString();
        req.body.deleted = false;
        req.body.verified = false;
    }
}

module.exports = new UsersCtrl();
