class Validator {
    static get regex() {
        return {
            id: /^[0-9]+$/,
            nickname: /^[a-zA-Z][\w]{2,}$/,
            word: /[a-zA-ZñÑ ]{3,}/,
            text: /[\wñÑ #@$%?()]{3,}/,
            password: /^[\wñÑ#@$%]{5,}$/,
            file: /^[\w]+\.(png|jpg)$/,
            email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        };
    }

    static id(data) {
        return (Validator.regex.id.test(data));
    }

    static word(data) {
        return (Validator.regex.word.test(data));
    }

    static required(data) {
        return data !== undefined && data !== null && data.length;
    }

    static email(data) {
        return (Validator.regex.email.test(data));
    }

    static boolean(data) {
        return data === 'true' || data === 'false';
    }

    static positive(data) {
        return data > 0;
    }

    static nickname(data) {
        return (Validator.regex.nickname.test(data));
    }

    static text(data) {
        return (Validator.regex.text.test(data));
    }

    static password(data) {
        return (Validator.regex.password.test(data));
    }

    static file(data) {
        return (Validator.regex.file.test(data));
    }

    static validate(req, res, next, rules = {}) {
        const error = {
            message: 'Validation Error',
            status: 409,
            details: {},
        };

        Object.entries(rules).forEach(([part, fields]) => {
            Object.entries(fields).forEach(([field, validations]) => {
                const [v, needed] = validations.split(',');
                if (Validator.required(req[part][field] || '') && needed === 'optional') {
                    if (!Validator[v](req[part][field] || '')) {
                        if (Array.isArray(error.details[field])) {
                            error.details[field].push(`The field ${field} should be a valid ${v}`);
                        } else {
                            error.details[field] = [`The field ${field} should be a valid ${v}`];
                        }
                    }
                }
            });
        });

        if (Object.keys(error.details).length) {
            next(error);
        } else {
            next();
        }
    }
}

module.exports = Validator;
