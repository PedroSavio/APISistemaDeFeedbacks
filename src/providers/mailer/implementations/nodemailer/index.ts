import { IMailProvider, IRequestMail } from '../../IMailProvider';
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
export class NodemailerMailerMail implements IMailProvider {
    async sendMail({
        to,
        from,
        subject,
        body, 
    } : IRequestMail) 
    {
        await transport.sendMail({
            from: `${from.name} <${from.email}>`,
            to: `${to.name} <${to.email}>`,
            subject,
            html: body,
        })
    };
}