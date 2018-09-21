
class Friends {
    constructor() {
        this.fri = [
            {
                user_1: 1,
                user_2: 3,
                friendship_date: '01/15/2018',
            },
            {
                user_1: 6,
                user_2: 3,
                friendship_date: '03/27/2018',
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
            data: this.fri,
            total: 2,
        };
        res.status(200).send(json);
    }

    get(req, res) {
        const json = {
            response: 'Ok',
            data: {
                user_1: req.params.user_1,
                user_2: req.params.user_2,
                friendship_date: '03/27/2018',
            },
        };
        res.status(200).send(json);
    }

    create(req, res) {
        const json = {
            response: 'OK',
            data: {
                user_1: req.body.user_1,
                user_2: req.body.user_2,
            },
        };
        res.status(200).send(json);
    }

    update(req, res) {
        res.status(204).send('Data is updated');
    }

    delete(req, res) {
        const json = {
            response: 'OK',
            user_1: req.params.user_1,
            user_2: req.params.user_2,
        };
        res.status(200).send(json);
    }
}

module.exports = new Friends();
