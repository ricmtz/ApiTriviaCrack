
class Validator {
    /**
     * Regex collection.
     *@type {Object}
     */
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

    /**
     * This function validate that the data is a valid id,
     * that mean that the have only positives numbers.
     * @param {String} data String to validate.
     * @returns {Boolean} Return true if the data match with an id structure
     *  otherwise false.
     */
    static id(data) {
        return (Validator.regex.id.test(data));
    }

    /**
     * This function validate that the data is a validad word, this means
     * that this data can not contains unusual charaters or numbers,
     * only letters and blank spaces.
     * @param {String} data String to validate.
     * @returns {Boolean} Return true if true if the data match with a valid
     * word structure otherwise false.
     */
    static word(data) {
        return (Validator.regex.word.test(data));
    }

    /**
     * This function validate that the data is not empty, undefined or null.
     * @param {String} data String to validate.
     * @returns {Boolean} Return true if true if the data contains at least a
     * blank space or charater otherwise false.
     */
    static required(data) {
        return data !== undefined && data !== null && data.length;
    }

    /**
     * This function validate that the data have a valid email structure,
     * i.e.g example@domain.com
     * @param {String} data String to validate.
     * @returns {Boolean} Return true if the data match with the structure of
     * a valid email.
     */
    static email(data) {
        return (Validator.regex.email.test(data));
    }

    /**
     * This function validate that the data have a valid boolean value,
     * that mean true or false.
     * @param {String} data String to validate.
     * @returns {Boolean} Return true if the data only have the word true or false,
     * otherwise false.
     */
    static boolean(data) {
        return data === 'true' || data === 'false';
    }

    /**
     * This function validate that the data is a positive number.
     * @param {Strng} data String to validate.
     * @returns {Boolean} Return true if the number is bigger or equals to zero,
     * otherwise return false.
     */
    static positive(data) {
        return data >= 0;
    }

    /**
     * This function validate that the data is a valid nickname,
     * that means that this do not start with numbers as well that
     * not contains blank spaces.
     * @param {String} data String to validate.
     * @returns {Boolean} Return true if the data match with a valid nickname
     * structure, otherwise false.
     */
    static nickname(data) {
        return (Validator.regex.nickname.test(data));
    }

    /**
     * This functions validate that the data do not have unusual
     * characters.
     * @param {String} data String to validate.
     * @returns {Boolean} Return true if the data match with a valid text
     * structure, otherwise false.
     */
    static text(data) {
        return (Validator.regex.text.test(data));
    }

    /**
     * This function validade that the data is a valid password,
     * this mean that do not contains especial character or blank spaces.
     * @param {String} data String to validate
     * @returns {Boolean} Return true if the data match with a valid password
     * structure, otherwise false.
     */
    static password(data) {
        return (Validator.regex.password.test(data));
    }

    /**
     * This function validate that the data is a valid file format,
     * this mean that follow the structure of 'name.extension'.
     * @param {String} data String to validate.
     * @returns {Boolean} Return true if the data match with a valid file
     * structure, otherwise false.
     */
    static file(data) {
        return (Validator.regex.file.test(data));
    }

    /**
     * This function evaluete the fields from the request object, and
     * create a error object if the filds have incorrect values.
     * @param {Object} req Express request object
     * @param {Object} res Express response object
     * @param {Function} next Express next middleware function
     * @param {Object} rules Object with the part of req to evalute, and
     * the fields to evalueate.
     */
    static validate(req, res, next, rules = {}) {
        const error = {
            message: 'Validation Error',
            status: 409,
            details: {},
        };

        Object.entries(rules).forEach(([part, fields]) => {
            Object.entries(fields).forEach(([field, validations]) => {
                const [v, needed] = validations.split(',');
                if (!Validator[v](req[part][field] || '')) {
                    if ((needed === 'optional' && Validator.required(req[part][field] || ''))) {
                        if (Array.isArray(error.details[field])) {
                            error.details[field].push(`The field ${field} should be a valid ${v}`);
                        } else {
                            error.details[field] = [`The field ${field} should be a valid ${v}`];
                        }
                    }
                    if ((needed === 'required')) {
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
