const regex = () => ({
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
});

const isValidEmail = (req, res, next) => {
    if (regex().email.test(req.body.email)) {
        next();
    } else {
        next('Email not valid');
    }
};

const isValidUserType = (req, res, next) => {
    if (req.body.user_type === 'true' || req.body.user_type === 'false') {
        next();
    } else {
        next('User type not valid');
    }
};

module.exports = { isValidEmail, isValidUserType };
