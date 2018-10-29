const nodemailer = require('nodemailer');

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
            console.log('Message sent: %s', info.messageId);
            return true;
        });
    }
}

module.exports = new Mailer();
