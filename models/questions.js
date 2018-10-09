class Questions {
    constructor({
        id, category, question, option1, option2,
        optioncorrect, approved, deleted, userid,
        createdate, approveddate,
    }) {
        this.setId(id);
        this.setCategory(category);
        this.setQuestion(question);
        this.setOption1(option1);
        this.setOption2(option2);
        this.setOptioncorrect(optioncorrect);
        this.setApproved(approved);
        this.setDeleted(deleted);
        this.setUserid(userid);
        this.setCreatedate(createdate);
        this.setApproveddate(approveddate);
    }

    getId() {
        return this.id;
    }

    getCategory() {
        return this.category;
    }

    getQuestion() {
        return this.question;
    }

    getOption1() {
        return this.option1;
    }

    getOption2() {
        return this.option2;
    }

    getOptioncorrect() {
        return this.optioncorrect;
    }

    getApproved() {
        return this.approved;
    }

    getDeleted() {
        return this.deleted;
    }

    getUserid() {
        return this.userid;
    }

    getCreatedate() {
        return this.createdate;
    }

    getApproveddate() {
        return this.approveddate;
    }

    setId(id) {
        if (id !== undefined) this.id = id;
    }

    setCategory(category) {
        if (category !== undefined) this.category = category;
    }

    setQuestion(question) {
        if (question !== undefined) this.question = question;
    }

    setOption1(option1) {
        if (option1 !== undefined) this.option1 = option1;
    }

    setOption2(option2) {
        if (option2 !== undefined) this.option2 = option2;
    }

    setOptioncorrect(optioncorrect) {
        if (optioncorrect !== undefined) this.optioncorrect = optioncorrect;
    }

    setApproved(approved) {
        if (approved !== undefined) this.approved = approved;
    }

    setDeleted(deleted) {
        if (deleted !== undefined) this.deleted = deleted;
    }

    setUserid(userid) {
        if (userid !== undefined) this.userid = userid;
    }

    setCreatedate(createdate) {
        if (createdate !== undefined) this.createdate = createdate;
    }

    setApproveddate(approveddate) {
        if (approveddate !== undefined) this.approveddate = approveddate;
    }
}

module.exports = Questions;
