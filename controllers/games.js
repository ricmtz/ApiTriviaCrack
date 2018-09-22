class GamesCtrl {
    constructor() {
        this.games = [
            {
                id: 9,
                player_1: 8,
                player_2: 45,
                answers_player_1: 3,
                answers_player_2: 4,
            },
            {
                id: 84,
                player_1: 64,
                player_2: 71,
                answers_player_1: 6,
                answers_player_2: 7,
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
            data: this.games,
        };
        res.status(200).send(json);
    }

    get(req, res) {
        const json = {
            response: 'Ok',
            data: this.games.find(el => el.id === Number(req.params.gameId)),
        };
        res.status(200).send(json);
    }

    create(req, res) {
        const generatedId = this.games[this.games.length - 1].id + 1;
        const json = {
            response: 'Created',
            data: {
                id: generatedId,
                url: `https://domain/games/${req.body.player_1}/${req.body.player_2}`,
            },
        };
        res.status(201).send(json);
    }

    update(req, res) {
        const json = {
            response: 'Ok',
            data: {
                id: req.params.gameId,
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

module.exports = new GamesCtrl();
