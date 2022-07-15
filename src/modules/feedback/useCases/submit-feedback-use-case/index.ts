import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";
import { NodemailerMailerMail } from "../../../../providers/mailer/implementations/nodemailer";
import { PrismaFeedbacksRepository } from "../../../../repositories/implementations/prisma/prisma-feedbacks-repository";

const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
const nodemailerMailerMail = new NodemailerMailerMail();


export default new SubmitFeedbackUseCase(prismaFeedbacksRepository,nodemailerMailerMail);




