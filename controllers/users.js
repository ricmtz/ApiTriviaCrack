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
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
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

    delete(req, res) {
        const json = {
            response: 'Ok',
            id: req.params.nickname,
        };
        res.status(200).send(json);
    }
}

module.exports = new UsersCtrl();
