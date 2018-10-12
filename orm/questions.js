const { db } = require('../db');
const { Question } = require('../models');

class Questions {
    constructor() {
        this.name = 'questions';
        this.categories = 'categories';
        this.users = 'users';
        this.msgNoCategoy = 'This category no exist';
        this.msgNoCreateQuestion = 'Dont create question';
        this.msgNoQuestion = 'This question dont exist';
        this.msgNoUser = 'This user dont exist';
    }

    async create(data) {
        const question = new Question(data);
        let result = await db.select(this.categories, ['id'], { id: data.category });
        if (result.length === 0) return this.msgNoCategory;
        result = await db.insert(this.name, question);
        result = await db.select(this.name, ['id'], question);
        if (result.length === 0) return this.msgNoCreateQuestion;
        question.setId(result[0].id);
        return question;
    }

    async addNicknameUser(question) {
        const result = await db.select(this.users, ['nickname'], { id: question.getUserid() });
        if (result.length === 0) return this.msgNoUser;
        question.setUser(result[0].nickname);
        return question;
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
        const data = { id: idQuestion, deleted: false };
        const result = await db.select(this.name, [], data);
        if (result.length === 0) return this.msgNoQuestion;
        let question = new Question(result[0]);
        question = await this.addNicknameUser(question);
        return question;
    }

    async getQuestion(nameQuestion) {
        const data = { question: nameQuestion, deleted: false };
        const result = await db.select(this.name, [], data);
        return result.length !== 0 ? new Question(result[0]) : this.msgNoQuestion;
    }

    async update(idQuestion, data) {
        let result = await db.select(this.name, ['id'], { id: idQuestion, deleted: false });
        if (result.length === 0) return this.msgNoQuestion;
        const question = new Question(data);
        if (data.category !== undefined) {
            result = await db.select(this.categories, ['id'], { id: data.category });
            if (result.length === 0) return this.msgNoCategory;
        }
        result = await db.update(this.name, question, { id: idQuestion });
        result = await db.select(this.name, ['id'], data);
        return result;
    }

    async delete(idQuestion) {
        let result = await db.select(this.name, ['id'], { id: idQuestion, deleted: false });
        if (result.length === 0) return this.msgNoQuestion;
        const data = { deleted: true };
        result = await db.update(this.name, data, { id: idQuestion });
        result = await db.select(this.name, ['id'], data);
        return result;
    }
}

module.exports = new Questions();
