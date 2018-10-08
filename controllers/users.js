const { UsersORM } = require('../orm');

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

        //this.getAll = this.getAll.bind(this);
        this.getAllEmails = this.getAllEmails.bind(this);
        this.getAllFriends = this.getAllFriends.bind(this);
        //this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(req, res) {
        const result = await UsersORM.getAll();
        const json = {
            data: result,
            total: result.length,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
    }

    async get(req, res) {
        const result = await UsersORM.getNickname(req.params.nickname);
        const json = {
            data: result,
        };
        if (result.length === 0) res.status(404);
        res.send(json);
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

    async create(req, res) {
        const result = await UsersORM.create(req.body);
        console.log(result);
        const json = {
            response: 'Ok',
            data: {
                nickname: result,
            },
        };
        res.status(200).send(json);
    }

    update(req, res) {
        res.status(204).send('Data successfully updated');
    }

    delete(req, res) {
        const json = {
            response: 'Ok',
            id: req.params.nickname,
        };
        res.status(200).send(json);
    }
}

module.exports = new UsersCtrl();
