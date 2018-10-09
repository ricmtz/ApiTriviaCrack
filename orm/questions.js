const { db } = require('../db');
const { Question } = require('../models');

class Questions {
    constructor() {
        this.name = 'questions';
        this.categories = 'categories';
        this.msgNoCategoy = 'This category no exist';
        this.msgNoCreateQuestion = 'Dont create question';
        this.msgNoQuestion = 'This question dont exist';
    }

    async create(data) {
        const question = new Question(data);
        let result = await db.select(this.categories, ['id'], { name: data.category });
        if (result.length === 0) return this.msgNoCategory;
        question.setCategory(result[0].id);
        result = await db.insert(this.name, question);
        result = await db.select(this.name, ['id'], question);
        if (result.length !== 0) {
            question.setId(result[0].id);
            return question;
        }
        return this.msgNoCreateQuestion;
    }

    async getAll() {
        const result = await db.select(this.name, [], { deleted: false });
        if (result.length === 0) return result;
        const response = [];
        result.forEach((row) => {
            response.push(new Question(row));
        });
        return response;
    }

    async get(idQuestion) {
        const data = { id: Number(idQuestion), deleted: false };
        const result = await db.select(this.name, [], data);
        return result.length !== 0 ? new Question(result[0]) : this.msgNoQuestion;
    }

    async getQuestion(nameQuestion) {
        const data = { question: nameQuestion, deleted: false };
        const result = await db.select(this.name, [], data);
        return result.length !== 0 ? new Question(result[0]) : this.msgNoQuestion;
    }

    async update(idQuestion, data) {
        console.log(data);
        const question = new Question(data);
        console.log(question);
        if (data.category !== undefined) {
            const result = await db.select(this.categories, ['id'], { name: data.category });
            if (result.length === 0) return this.msgNoCategory;
            question.setCategory(result[0].id);
        }
        console.log(question);
        let result = await db.update(this.name, question, { id: idQuestion });
        result = await db.select(this.name, ['id'], data);
        console.log(result);
        return result;
    }

    async delete(idQuestion) {
        const data = { deleted: true };
        let result = await db.update(this.name, data, { id: idQuestion });
        result = await db.select(this.name, ['id'], data);
        return result;
    }
}

module.exports = new Questions();
