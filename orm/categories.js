const { db } = require('../db');
const { Category } = require('../models');
const { filters } = require('../filters');

// FIXME Todos los métodos deben estar documentados

class Categories {
    constructor() {
        this.name = 'categories';
        this.msgNoCategory = 'This category not exist';
        this.msgNoCreateCategory = 'Dont can create category';
        this.msgExistName = 'This category already exists';
        this.msgExistColor = 'This color already exists';
    }

    async getAll(page, conditions) {
        let result = null;
        await db.selectPaged(this.name, this.getFilters(conditions), [], page)
            .then((res) => { result = this.processResult(res); })
            .catch(err => Promise.reject(err));
        return result;
    }

    async get(categoryId) {
        let result = null;
        await db.selectNonDel(this.name, { id: categoryId })
            .then((res) => { result = this.processResult(res); })
            .catch(() => Promise.reject(new Error(this.msgNoCategory)));
        return result;
    }

    async getByName(categoryName) {
        let result = null;
        await db.selectNonDel(this.name, { name: categoryName })
            .then((res) => { result = this.processResult(res); })
            .catch(() => Promise.reject(new Error(this.msgNoCategory)));
        return result;
    }

    async create(data) {
        const category = new Category(data);
        await this.existsAttribs(category)
            .catch(err => Promise.reject(err));
        await db.insert(this.name, category, 'id')
            .then((res) => { category.setId(res); })
            .catch((err) => { Promise.reject(err); });
        return category;
    }

    async update(categoryId, data) {
        await db.selectNonDel(this.name, { id: categoryId }, ['id'])
            .catch(() => Promise.reject(new Error(this.msgNoCategory)));
        const category = new Category(data);
        await this.existsAttribs(category)
            .catch(err => Promise.reject(err));
        await db.update(this.name, category, { id: categoryId, deleted: false })
            .catch(err => Promise.reject(err));
    }

    async delete(categoryId) {
        await db.selectNonDel(this.name, { id: categoryId }, ['id'])
            .catch(() => Promise.reject(new Error(this.msgNoCategory)));
        await db.delete(this.name, { id: categoryId })
            .catch(err => Promise.reject(err));
    }

    processResult(rows) {
        if (!rows) {
            return null;
        }
        if (!Array.isArray(rows)) {
            return new Category(rows);
        }
        if (rows.length === 1) {
            return new Category(rows[0]);
        }
        const categoriesList = [];
        rows.forEach((row) => { categoriesList.push(new Category(row)); });
        return categoriesList;
    }

    async existsAttribs(category) {
        let error = null;
        error = await db.exists(this.name, { name: category.getName() })
            .catch(() => {});
        if (error) {
            return Promise.reject(new Error(this.msgExistName));
        }
        error = await db.exists(this.name, { color: category.getColor() })
            .catch(() => {});
        if (error) {
            return Promise.reject(new Error(this.msgExistColor));
        }
        return null;
    }

    getFilters(cond) {
        const result = [];
        if (cond.name) {
            result.name = filters.strFilter('name', cond.name);
        }
        return result;
    }
}

module.exports = new Categories();
