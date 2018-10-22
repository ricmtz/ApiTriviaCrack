const { db } = require('../db');
const { Question } = require('../models');

// FIXME En los metodos getAll se debe permitir paginado y filtrado

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

    async getAll({ page }) {
        await db.selectPaged(this.name, null, [], page)
            .then((res) => { this.processResult(res); })
            .catch(err => Promise.reject(err));
        return this.result;
    }

    async get({ questionId }) {
        const data = { id: Number(questionId) };
        await db.selectNonDel(this.name, data)
            .then((res) => { this.processResult(res); })
            .catch(() => Promise.reject(new Error(this.msgNoQuestion)));
        return this.result;
    }

    async getQuestion({ question }) {
        const data = { question };
        await db.selectNonDel(this.name, data)
            .then((res) => { this.processResult(res); })
            .catch(() => Promise.reject(new Error(this.msgNoQuestion)));
        return this.result;
    }

    async create(data) {
        const question = new Question(data);
        await this.existsAttribs(question)
            .catch(err => Promise.reject(err));
        await db.insert(this.name, question)
            .catch(err => Promise.reject(err));
        await db.selectNonDel(this.name, { question: question.getQuestion() })
            .then((res) => { this.processResult(res); })
            .catch(err => Promise.reject(err));
        return this.result;
    }


    async update({ questionId }, data) {
        await db.selectNonDel(this.name, { id: questionId }, ['id'])
            .catch(() => Promise.reject(new Error(this.msgNoQuestion)));
        const question = new Question(data);
        await this.existsAttribs(question)
            .catch(err => Promise.reject(err));
        await db.update(this.name, question, { id: questionId })
            .catch(err => Promise.reject(err));
    }

    async delete({ questionId }) {
        await db.selectNonDel(this.name, { id: questionId }, ['id'])
            .catch(() => Promise.reject(new Error(this.msgNoQuestion)));
        await db.delete(this.name, { id: questionId })
            .catch(err => Promise, reject(err));
    }

    processResult(rows) {
        this.result = null;
        if (!rows) {
            this.res = null;
        }
        if (!Array.isArray(rows) || rows.length === 1) {
            this.result = new Question(rows);
        }
        this.result = [];
        rows.forEach((row) => { this.result.push(new Question(row)); });
    }

    async existsAttribs(question) {
        let error = null;

        error = await db.exists(this.name, { question: question.getQuestion() })
            .catch(() => { });
        if (error) {
            return Promise.reject(new Error(this.msgExistNickname));
        }

        return null;
    }
}

module.exports = new Questions();
