const { CategoriesORM } = require('../orm');

class CategoriesCtrl {
    /**
     * Cosntructor of CategoriesCtrl
     */
    constructor() {
        this.create = this.create.bind(this);
    }

    /**
     * This function request to the data base all the
     * categories stored.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.query.page Page number.
     */
    async getAll(req, res) {
        await CategoriesORM.getAll(req.query.page)
            .then((categ) => {
                res.status(200).send({
                    data: categ,
                    total: categ.length,
                });
            })
            .catch((err) => { res.status(404).send({ data: err.message }); });
    }

    /**
     * This function request to the data base all the information
     * associated with a certaint category id.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.params.categoryId Category id.
     */
    async get(req, res) {
        await CategoriesORM.get(req.params.categoryId)
            .then((categ) => { res.status(200).send({ data: categ }); })
            .catch((err) => { res.status(404).send({ error: err.message }); });
    }

    /**
     * This method request to the data base create a category
     * with the given data.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Object} req.body Data to created the category.
     * @param {String} req.body.name Name category.
     * @param {String} req.body.color Color category.
     */
    async create(req, res) {
        this.setDefaultValues(req);
        await CategoriesORM.create(req.body)
            .then((categ) => { res.status(200).send({ data: categ }); })
            .catch((err) => { res.status(404).send({ error: err.message }); });
    }

    /**
     * This function request to the data base an update of a
     * certain category, replacing the data with the given data.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.params.categoryId Category id
     * @param {Object} req.body Category data to update.
     * @param {String} req.body.name Name category.
     * @param {String} req.body.color Color category.
     * @param {String} req.body.icon Category icon.
     * @param {Boolean} req.body.deleted Category deleted property.
     */
    async update(req, res) {
        await CategoriesORM.update(req.params.categoryId, req.body)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ error: err.message }); });
    }

    /**
     * This method request to the data base delete a
     * certain category.
     * @param {Object} req Express request object.
     * @param {Object} res Express response object.
     * @param {Number} req.params.categoryId Category id.
     */
    async delete(req, res) {
        await CategoriesORM.delete(req.params.categoryId)
            .then(() => { res.status(204).send(); })
            .catch((err) => { res.status(404).send({ error: err.message }); });
    }

    /**
     * This function setup the default values to
     * the icon and deleted property of the category.
     * @param {Object} req Express request object.
     * @param {String} req.body.icon Category icon.
     * @param {Boolean} req.body.deleted Category deleted property.
     */
    setDefaultValues(req) {
        req.body.icon = 'default.png';
        req.body.deleted = false;
    }
}

module.exports = new CategoriesCtrl();
