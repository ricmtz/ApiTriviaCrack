class Emails {
    constructor() {
        this.emails = [
            {
                idUser: 1,
                email: 'pepe13@gmail.com',
            },
            {
                idUser: 2,
                email: 'jose_morales@gmail.com',
            },
            {
                idUser: 1,
                email: 'pepechuy@gmail.com',
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
            data: `emails of ${req.params.nickname}`,
        };
        res.status(200).send(json);
    }

    get(req, res) {
        const emails = this.emails.filter(e => e.idUser === Number(req.params.userId));
        const json = {
            response: 'Ok',
            idUser: req.params.userId,
            data: emails,
            total: emails.length,
        };
        res.status(200).send(json);
    }

    create(req, res) {
        const json = {
            response: 'Ok',
            data: `emails add to ${req.params.nickname}`,
        };
        res.status(200).send(json);
    }

    update(req, res){
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

module.exports = new Emails();
