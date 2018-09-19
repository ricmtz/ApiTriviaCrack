
exports.getAll = (req, res) => {
    const users = [
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
    const json = {
        response: 'Ok',
        data: users,
        total: 2,
    };
    res.status(200).send(json);
};

exports.get = (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            id: req.params.userId,
            nickname: 'xXRuben777Xx',
            email: 'ruben@gmail.com',
            current_points: 767,
        },
    };
    res.status(200).send(json);
};

exports.create = (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            id: 100,
            nickname: req.body.nickname,
        },
    };
    res.status(200).send(json);
};

exports.update = (req, res) => {
    res.status(204).send('Data successfully updated');
};

exports.delete = (req, res) => {
    const json = {
        response: 'Ok',
        id: req.params.userId,
    };
    res.status(200).send(json);
};
