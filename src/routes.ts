import express from 'express'
import nodemailer from 'nodemailer'
import { SubmitFeedbackUseCase } from './UseCases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailerMail } from './mailer/nodemailer/nodemailer-mailer-mail';

export const routes = express.Router()

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "2dac8800681043",
        pass: "e7adfb24fbc2ef"
    }
});

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenschot } = req.body
    
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailerMail = new NodemailerMailerMail()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailerMailerMail
    )
    
    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenschot
    })

    return res.status(201).send();
})