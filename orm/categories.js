const { db } = require('../db');
const { Category } = require('../models');

class Categories {
    constructor() {
        this.name = 'categories';
        this.msgNoCategory = 'This category not exist';
        this.msgNoCreateCategory = 'Dont can create category';
        this.msgExistName = 'This category already exists';
        this.msgExistColor = 'This color already exists';
    }

    async getAll({ page }) {
        await db.selectPaged(this.name, {}, [], page)
            .then((res) => { this.processResult(res); })
            .catch(err => Promise.reject(err));
        return this.result;
    }

    async get({ categoryId }) {
        await db.select(this.name, { id: categoryId, deleted: false })
            .then((res) => { this.processResult(res); })
            .catch(() => Promise.reject(new Error(this.msgNoCategory)));
        return this.result;
    }

    async getCategory({ name }) {
        await db.select(this.name, { name, deleted: false })
            .then((res) => { this.processResult(res); })
            .catch(() => Promise.reject(new Error(this.msgNoCategory)));
        return this.result;
    }

    async create(data) {
        this.result = null;
        const category = new Category(data);
        await this.existsAttribs(category)
            .catch(err => Promise.reject(err));
        await db.insert(this.name, category)
            .catch((err) => { Promise.reject(err); });
        await db.select(this.name, { name: category.getName() }, [])
            .then((res) => { this.processResult(res); })
            .catch((err) => { Promise.reject(err); });
        return this.result;
    }

    async update({ categoryId }, data) {
        await db.select(this.name, { id: categoryId }, ['id'])
            .catch(() => Promise.reject(new Error(this.msgNoCategory)));
        const category = new Category(data);
        await this.existsAttribs(category)
            .catch(err => Promise.reject(err));
        await db.update(this.name, category, { id: categoryId, deleted: false })
            .catch(err => Promise.reject(err));
    }

    async delete({ categoryId }) {
        await db.select(this.name, { id: categoryId }, ['id'])
            .catch(() => Promise.reject(new Error(this.msgNoCategory)));
        await db.delete(this.name, { id: categoryId })
            .catch(err => Promise.reject(err));
    }

    processResult(rows) {
        this.result = null;
        if (!rows) {
            this.res = null;
        }
        if (!Array.isArray(rows) || rows.length === 1) {
            this.result = new Category(rows);
        }
        this.result = [];
        rows.forEach((row) => { this.result.push(new Category(row)); });
    }

    async existsAttribs(category) {
        let error = null;
        error = await db.exists(this.name, { name: category.getName() })
            .catch(err => Promise.reject(err));
        if (error) {
            return Promise.reject(new Error(this.msgExistName));
        }
        error = await db.exists(this.name, { color: category.getColor() })
            .catch(err => Promise.reject(err));
        if (error) {
            return Promise.reject(new Error(this.msgExistColor));
        }
        return null;
    }
}

module.exports = new Categories();
