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

    async getAll(page, filters) {
        let result = null;
        const filtersObj = await this.getFilters(filters)
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

    async getFilters(query) {
        const result = [];
        if (query.question) {
            result.push({
                attrib: 'question',
                opr: ' LIKE ',
                val: `%${query.question}%`,
            });
        }
        if (query.option1) {
            result.push({
                attrib: 'option1',
                opr: ' LIKE ',
                val: `%${query.option1}%`,
            });
        }
        if (query.option2) {
            result.push({
                attrib: 'option2',
                opr: ' LIKE ',
                val: `%${query.option2}%`,
            });
        }
        if (query.optionCorrect) {
            result.push({
                attrib: 'optioncorrect',
                opr: ' LIKE ',
                val: `%${query.optionCorrect}%`,
            });
        }
        if (query.category) {
            await CategoriesORM.getByName(query.category)
                .then((cat) => { result.category = cat.getId(); });
        }
        if (typeof (query.approved) !== 'undefined') {
            result.approved = query.approved;
        }
        return result;
    }
}

module.exports = new Questions();
