const { db } = require('../db');
const { Question } = require('../models');
const CategoriesORM = require('./categories');
const UsersORM = require('./users');
const { filters } = require('../filters');

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

    async getAll(page, conditions) {
        let result = null;
        const filtersObj = await this.getFilters(conditions)
            .catch(err => Promise.reject(err));
        await db.selectPaged(this.name, filtersObj, [], page)
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

    async getQuestion(questionText) {
        let result = null;
        await db.selectNonDel(this.name, { question: questionText })
            .then((res) => { result = this.processResult(res); })
            .catch(() => Promise.reject(new Error(this.msgNoQuestion)));
        return result;
    }

    async create(data) {
        const question = new Question(data);
        await this.existsAttribs(question)
            .catch(err => Promise.reject(err));
        await db.insert(this.name, question, 'id')
            .then((res) => { question.setId(res); })
            .catch((err) => { Promise.reject(err); });
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
        const questionList = [];
        rows.forEach((row) => { questionList.push(new Question(row)); });
        return questionList;
    }

    async existsAttribs(question) {
        let error = null;

        error = await db.exists(this.name, { question: question.getQuestion() })
            .catch(() => {});
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
            .then((res) => { question.setUserid(res.getNickname()); })
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

    async getFilters(cond) {
        const result = {};
        if (cond.category) {
            await CategoriesORM.getByName(cond.category)
                .then((cat) => { result.category = cat.getId(); })
                .catch(err => Promise.reject(err));
        }
        if (cond.question) {
            result.question = filters.strFilter('question', cond.question);
        }
        if (cond.option1) {
            result.option1 = filters.strFilter('option1', cond.option1);
        }
        if (cond.option2) {
            result.option2 = filters.strFilter('option2', cond.option2);
        }
        if (cond.optionCorrect) {
            result.optionCorrect = filters.strFilter('optioncorrect', cond.optionCorrect);
        }
        if (typeof (cond.approved) !== 'undefined') {
            result.approved = cond.approved;
        }
        if (cond.user) {
            await UsersORM.getByNickname(cond.user)
                .then((usr) => { result.userid = usr.getId(); })
                .catch(err => Promise.reject(err));
        }
        return result;
    }
}

module.exports = new Questions();
