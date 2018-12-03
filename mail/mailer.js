const nodemailer = require('nodemailer');

// FIXME esta clase y sus metodos deben estar documentados

class Mailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        this.mailOptions = {
            from: '"Trivia Crack App" <triviacrack@example.com>',
        };

        this.sendMail = this.sendMail.bind(this);
    }

    sendMail(options) {
        const mailOptions = {
            ...this.mailOptions,
            ...options,
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            return true;
        });
    }


    sendConfirmation(email, token) {
        this.sendMail({
            to: email,
            subject: 'Trivia Crack account confirmation',
            text: token, // FIXME lo que deberia mandar seria un mensaje en html con un boton que mande a una url para confirmar el token, no el token directamente
        });
    }

    sendRestoration(email, token) {
        this.sendMail({
            to: email,
            subject: 'Trivia Crack password restoration',
            text: token,
        });
    }
}

module.exports = new Mailer();
