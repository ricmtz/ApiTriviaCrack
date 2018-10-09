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

    async getAll() {
        const result = await db.select(this.name);
        if (result.length === 0) return result;
        const response = [];
        result.forEach((row) => {
            response.push(new Category(row));
        });
        return response;
    }

    async get(idUser) {
        const data = { id: idUser };
        const result = db.select(this.name, [], data);
        return result.length !== 0 ? new Category(result[0]) : this.msgNoCategory;
    }

    async getCategory(category) {
        const data = { name: category };
        const result = await db.select(this.name, [], data);
        return result.length !== 0 ? new Category(result[0]) : this.msgNoCategory;
    }

    async existData(table, condition) {
        const result = await db.select(table, ['count(*)'], condition);
        return (result[0].count != 0);
    }

    async create(data) {
        const category = new Category(data);
        console.log(category);
        let exist = await this.existData(this.name, { name: category.getName() });
        if (exist) return this.msgExistName;
        exist = await this.existData(this.name, { color: category.getColor() });
        if (exist) return this.msgExistColor;
        let result = await db.insert(this.name, category);
        console.log(result);
        result = await db.select(this.name, ['id'], category);
        console.log(result);
        if (result.length !== 0) {
            category.setId(result[0].id);
            return category;
        }
        return this.msgNoCreateCategory;
    }

    async update(nameCategory, data) {
        const res = await db.select(this.name, ['id'], { name: nameCategory });
        if (res.length === 0) return this.msgNoCategory;
        const category = new Category(data);
        console.log(category);
        let exist = await this.existData(this.name, { nickname: category.getName() });
        if (exist) return this.msgExistName;
        exist = await this.existData(this.name, { email: category.getColor() });
        if (exist) return this.msgExistColor;
        let result = await db.update(this.name, category, { name: nameCategory });
        result = await db.select(this.name, ['id'], data);
        return result;
    }

    async delete(nameCategory) {
        const res = await db.select(this.name, ['id'], { name: nameCategory });
        if (res.length === 0) return this.msgNoCategory;
        const data = { deleted: true };
        let result = await db.update(this.name, data, { name: nameCategory });
        result = await db.select(this.name, ['id'], data);
        return result;
    }
}

module.exports = new Categories();
