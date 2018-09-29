class UsersCtrl {
    constructor() {
        this.users = [
            {
                id: 1,
                nickname: 'xXPedro777Xx',
                email: 'jose@gmail.com',
                current_points: 777,
            },
            {
                id: 2,
                nickname: 'xXRuben777Xx',
                email: 'ruben@gmail.com',
                current_points: 767,
            },
        ];

        this.getAll = this.getAll.bind(this);
        this.getAllEmails = this.getAllEmails.bind(this);
        this.getAllFriends = this.getAllFriends.bind(this);
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.addEmail = this.addEmail.bind(this);
        this.addFriend = this.addFriend.bind(this);
        this.removeEmail = this.removeEmail.bind(this);
        this.removeFriend = this.removeFriend.bind(this);
        this.getAllQuestions = this.getAllQuestions.bind(this);
        this.getQuestion = this.getQuestion.bind(this);
        this.createdQuestion = this.createdQuestion.bind(this);
        this.createdQuestion = this.createdQuestion.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);
    }

    getAll(req, res) {
        const json = {
            response: 'Ok',
            data: this.users,
            total: 2,
        };
        res.status(200).send(json);
    }

    get(req, res) {
        const json = {
            response: 'Ok',
            data: this.users.find(el => el.nickname === req.params.nickname),
        };
        res.status(200).send(json);
    }

    getAllEmails(req, res) {
        const json = {
            response: 'Ok',
            data: `emails of ${req.params.nickname}`,
        };
        res.status(200).send(json);
    }

    getAllFriends(req, res) {
        const json = {
            response: 'Ok',
            data: `friends of ${req.params.nickname}`,
            total: 1,
        };
        res.status(200).send(json);
    }

    addEmail(req, res) {
        const json = {
            response: 'Ok',
            data: `emails add to ${req.params.nickname}`,
        };
        res.status(200).send(json);
    }

    addFriend(req, res) {
        const json = {
            response: 'Ok',
            data: `friend add to ${req.params.nickname}`,
        };
        res.status(200).send(json);
    }

    create(req, res) {
        const json = {
            response: 'Ok',
            data: {
                id: 100,
                nickname: req.body.nickname,
            },
        };
        res.status(200).send(json);
    }

    update(req, res) {
        res.status(204).send('Data successfully updated');
    }

    updateEmail(req, res){
        res.status(204).send('Data successfully updated');
    }

    delete(req, res) {
        const json = {
            response: 'Ok',
            id: req.params.nickname,
        };
        res.status(200).send(json);
    }

    removeEmail(req, res) {
        const json = {
            response: 'Ok',
            id: req.params.nickname,
        };
        res.status(200).send(json);
    }

    removeFriend(req, res) {
        const json = {
            response: 'Ok',
            id: req.params.nickname,
        };
        res.status(200).send(json);
    }

    getAllQuestions(req, res) {
        const json = {
            response: 'Ok',
            data: `All questions from ${req.params.nickname}`,
        };
        res.status(200).send(json);
    }

    getQuestion(req, res){
        const json = {
            response: 'Ok',
            data: `Questions ${req.params.questionId} from ${req.params.nickname}`,
        };
        res.status(200).send(json);
    }

    createdQuestion(req, res) {
        const json = {
            response: 'Ok',
            data: `Questions created for ${req.params.nickname}`,
        };
        res.status(200).send(json);
    }

    removeQuestion(req, res) {
        const json = {
            response: 'Ok',
            data: `Question ${req.params.questionId} deleted from ${req.params.nickname}`,
        };
        res.status(200).send(json);
    }

    updateQuestion(req, res) {
        const json = {
            response: 'Ok',
            data: `Question ${req.params.questionId} updated from ${req.params.nickname}`,
        };
        res.status(200).send(json);
    }
}

module.exports = new UsersCtrl();
