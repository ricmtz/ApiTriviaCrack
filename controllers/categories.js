
class Categories {
    constructor() {
        this.categories = [
            {
                id: 5,
                name: 'Databases',
                color: 'Red',
                icon: 'Icon.png',
            },
            {
                id: 6,
                name: 'Software Engineering',
                color: 'Blue',
                icon: 'IconSE.png',
            },
        ];

        this.getAll = this.getAll.bind(this);
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }

    getAll(req, res) {
        const json = {
            response: 'Ok',
            data: this.categories,
        };
        res.status(200).send(json);
    }

    get(req, res) {
        const json = {
            response: 'Ok',
            data: this.categories.find(c => c.id === Number(req.params.categoryId)),
        };
        res.status(200).send(json);
    }

    create(req, res) {
        const generatedId = this.categories[this.categories.length - 1].id + 1;
        const json = {
            response: 'Created',
            data: {
                id: generatedId,
                url: `https://domain/categories/${req.body.name}`,
            },
        };
        res.status(201).send(json);
    }

    update(req, res) {
        const json = {
            response: 'Ok',
            data: {
                id: req.params.categoryId,
                name: req.body.name,
            },
        };
        res.status(200).send(json);
    }

    delete(req, res) {
        const json = {
            response: 'No content',
            data: {},
        };
        res.status(204).send(json);
    }

    deleteAll(req, res) {
        const json = {
            response: 'No content',
            data: {},
        };
        res.status(204).send(json);
    }
}

module.exports = new Categories();
