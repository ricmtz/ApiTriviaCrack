const nodemailer = require('nodemailer');

class Mailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USER,
                clientId: process.env.MAIL_CLIENT_ID,
                clientSecret: process.env.MAIL_CLIENT_SECRET,
                refreshToken: process.env.MAIL_REFRESH_TOKEN,
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

    async sendMail(options) {
        const mailOptions = {
            ...this.mailOptions,
            ...options,
        };

        await this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return Promise.reject(error);
            }
            return Promise.resolve(info);
        });
    }

    async sendVerification(email, token) {
        try {
            await this.sendMail({
                to: email,
                subject: 'Trivia Crack account verification',
                text: `Trivia Crack Verification\n${process.env.HOST}/verify?token=${token}`,
                html: `<h1 style="text-align: center;">Trivia Crack Verification</h1>
                <div class="" style="width: 20%; margin: auto;">
                <a href="${process.env.HOST}/verify?token=${token}">
                <button type="button" name="button" style="width: 100%;">Verify</button>
                </a>
                </div>`,
            });
        } catch (e) {
            return Promise.reject(e);
        }
        return true;
    }

    async sendRestoration(email, token) {
        try {
            await this.sendMail({
                to: email,
                subject: 'Trivia Crack password restoration',
                text: `Trivia Crack Pass Restoration\n${process.env.HOST}/restore?token=${token}`,
                html: `<h1 style="text-align: center;">Trivia Crack Pass Restoration</h1>
                        <div class="" style="width: 20%; margin: auto;">
                            <a href="${process.env.HOST}/restore?token=${token}">
                                <button type="button" name="button" style="width: 100%;">Restore</button>
                            </a>
                        </div>`,
            });
        } catch (e) {
            return Promise.reject(e);
        }
        return true;
    }
}

module.exports = new Mailer();
