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
            tls: {
                rejectUnauthorized: false,
            },
        });

        this.mailOptions = {
            from: `"Trivia Crack App" <${process.env.MAIL_USER}>`,
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


    sendVerification(email, token) {
        this.sendMail({
            to: email,
            subject: 'Trivia Crack account verification',
            text: `${process.env.HOST}/verify?token=${token}`,
        });
    }

    sendRestoration(email, token) {
        this.sendMail({
            to: email,
            subject: 'Trivia Crack password restoration',
            text: `${process.env.HOST}/restore?token=${token}`,
        });
    }
}

module.exports = new Mailer();
