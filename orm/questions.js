const { db } = require('../db');
const { Question } = require('../models');

class Questions {
    constructor() {
        this.name = 'questions';
        this.categories = 'categories';
        this.msgExisQuestion = 'This question already exist.';
        this.msgNoCategoy = 'This category no exist';
        this.msgNoCreateQuestion = 'Dont create question';
        this.msgNoQuestion = 'This question dont exist';
    }

    async getAll(page) {
        let result = null;
        await db.selectPaged(this.name, null, [], page)
            .then((res) => { result = this.processResult(res); })
            .catch(err => Promise.reject(err));
        return result;
    }

    async get(questionId) {
        let result = null;
        await db.selectNonDel(this.name, { id: Number(questionId) })
            .then((res) => { result = this.processResult(res); })
            .catch(() => Promise.reject(new Error(this.msgNoQuestion)));
        return result;
    }

    async getQuestion(question) {
        let result = null;
        await db.selectNonDel(this.name, { question })
            .then((res) => { result = this.processResult(res); })
            .catch(() => Promise.reject(new Error(this.msgNoQuestion)));
        return result;
    }

    async create(data) {
        let result = null;
        const question = new Question(data);
        await this.existsAttribs(question)
            .catch(err => Promise.reject(err));
        await db.insert(this.name, question)
            .catch((err) => { Promise.reject(err); });
        await db.selectNonDel(this.name, { question: question.getQuestion() }, ['id'])
            .then((res) => { result = this.processResult(res); })
            .catch((err) => { Promise.reject(err); });
        question.setId(result.getId());
        return question;
    }

    async update(questionId, data) {
        await db.selectNonDel(this.name, { id: questionId }, ['id'])
            .catch(() => Promise.reject(new Error(this.msgNoQuestion)));
        const question = new Question(data);
        await this.existsAttribs(question)
            .catch(err => Promise.reject(err));
        await db.update(this.name, question, { id: questionId, deleted: false })
            .catch(err => Promise.reject(err));
    }

    async delete(questionId) {
        await db.selectNonDel(this.name, { id: questionId }, ['id'])
            .catch(() => Promise.reject(new Error(this.msgNoQuestion)));
        await db.delete(this.name, { id: questionId })
            .catch(err => Promise.reject(err));
    }

    processResult(rows) {
        if (!rows) {
            return null;
        }
        if (!Array.isArray(rows)) {
            return new Question(rows);
        }
        if (rows.length === 1) {
            return new Question(rows[0]);
        }
        let questionList = [];
        rows.forEach((row) => { questionList.push(new Question(row)); });
        return questionList;
    }

    async existsAttribs(question) {
        let error = null;

        error = await db.exists(this.name, { question: question.getQuestion() })
            .catch(() => { });
        if (error) {
            return Promise.reject(new Error(this.msgExisQuestion));
        }

        return null;
    }
}

module.exports = new Questions();
