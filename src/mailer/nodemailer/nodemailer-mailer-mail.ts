import { SendMailData, Mail } from "../mailer-mail";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "2dac8800681043",
        pass: "e7adfb24fbc2ef"
    }
});

//Inversao de dependenca SOLID
export class NodemailerMailerMail implements Mail {
    async sendMail({subject, body} : SendMailData) {
        await transport.sendMail({
            from: 'Email TestApi <apiTest@feedget.com>',
            to: 'Savio <saviokbca@gmail.com',
            subject,
            html: body,
        })
    };
}