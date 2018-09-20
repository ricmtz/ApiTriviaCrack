exports.getAll = (req, res) => {
    const emails = [
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
    const json = {
        response: 'Ok',
        data: emails,
        total: emails.length,
    };
    res.status(200).send(json);
};

exports.get = (req, res) => {
    const emails = ['pepe13@gmail.com', 'pepechuy@gmail.com'];
    const json = {
        response: 'Ok',
        idUser: req.params.userId,
        data: emails,
        total: emails.length,
    };
    res.status(200).send(json);
};

exports.create = (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            email: req.body.email,
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
        email: req.params.userEmail,
    };
    res.status(200).send(json);
};
