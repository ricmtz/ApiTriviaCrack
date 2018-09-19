
exports.getAll = (req, res) => {
    const fri = [
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
    const json = {
        response: 'Ok',
        data: fri,
        total: 2,
    };
    res.status(200).send(json);
};

exports.get = (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            user_1: req.params.user_1,
            user_2: req.params.user_2,
            friendship_date: '03/27/2018',
        },
    };
    res.status(200).send(json);
};

exports.create = (req, res) => {
    const json = {
        response: 'OK',
        data: {
            user_1: req.body.user_1,
            user_2: req.body.user_2,
        },
    };
    res.status(200).send(json);
};

exports.update = (req, res) => {
    res.status(204).send('Data is updated');
};

exports.delete = (req, res) => {
    const json = {
        response: 'OK',
        user_1: req.params.user_1,
        user_2: req.params.user_2,
    };
    res.status(200).send(json);
};
