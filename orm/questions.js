const { db } = require('../db');
const { Question } = require('../models');
const CategoriesORM = require('./categories');
const UsersORM = require('./users');

// FIXME En los metodos getAll se debe permitir paginado y filtrado

class Questions {
    constructor() {
        this.name = 'questions';
        this.categories = 'categories';
        this.msgExisQuestion = 'This question already exist.';
        this.users = 'users';
        this.msgNoCategoy = 'This category no exist';
        this.msgNoCreateQuestion = 'Dont create question';
        this.msgNoQuestion = 'This question dont exist';
        this.msgNoUser = 'This user dont exist';
    }

    async getAll(page) {
        let result = null;
        await db.selectPaged(this.name, null, [], page)
            .then((res) => { result = this.processResult(res); })
            .catch(err => Promise.reject(err));
        await this.appendValues(result)
            .catch(err => Promise.reject(err));
        return result;
    }

    async get(questionId) {
        let result = null;
        await db.selectNonDel(this.name, { id: Number(questionId) })
            .then((res) => { result = this.processResult(res); })
            .catch(() => Promise.reject(new Error(this.msgNoQuestion + questionId)));
        await this.appendValue(result)
            .catch(err => Promise.reject(err));
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

    async appendValue(question) {
        await CategoriesORM.get(question.getCategory())
            .then((res) => { question.setCategory(res.getName()); })
            .catch(err => Promise.reject(err));
        await UsersORM.get(question.getUserid())
            .then((res) => { question.setUserid(res.getNickname()) })
            .catch(err => Promise.reject(err));
        question.user = question.getUserid();
        delete question.userid;
    }

    async appendValues(questions) {
        if (!Array.isArray(questions)) {
            await this.appendValue(questions)
                .catch(err => Promise.reject(err));
        } else {
            const promises = [];
            for (let i = 0; i < questions.length; i += 1) {
                promises.push(this.appendValue(questions[i]));
            }
            await Promise.all(promises)
                .catch(err => Promise.reject(err));
        }
    }
}

module.exports = new Questions();
