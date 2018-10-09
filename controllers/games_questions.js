class GamesQuestionsCtrl {
    constructor() {
        this.gamesQuestions = [
            {
                game: 1,
                question: 1,
                selected_option_player_1: 'Puerta Ordenadas Operable',
                option_player_1: false,
                selected_option_player_2: 'Programación Orientada a Objetos',
                option_player_2: true,
            },
            {
                game: 1,
                question: 2,
                selected_option_player_1: 'Linus',
                option_player_1: false,
                selected_option_player_2: 'BIll',
                option_player_2: true,
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
            data: `All questions from ${req.params.gameId}`,
        };
        res.status(200).send(json);
    }

    get(req, res) {
        const json = {
            response: 'Ok',
            data: `Question ${req.params.questionId} from ${req.params.gameId}`,
        };
        res.status(200).send(json);
    }

    create(req, res){
        const json = {
            response: 'Ok',
            data: `Creation questions to ${req.params.gameId}`,
        };
        res.status(200).send(json);
    }

    update(req, res) {
        const json = {
            response: 'Ok',
            data: `Question ${req.params.questionId} updated from ${req.params.gameId}`,
        };
        res.status(200).send(json);
    }

    delete(req, res) {
        const json = {
            response: 'Ok',
            data: `Question ${req.params.questionId} removed from ${req.params.gameId}`,
        };
        res.status(200).send(json);
    }
}

module.exports = new GamesQuestionsCtrl();
