import { NodemailerMailerMail } from "../mailer/nodemailer/nodemailer-mailer-mail";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

export interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenschot?: string;
}

//Principio SOLID Inversao de classe (Classe não depende necessariamente do prisma)
export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private nodeMailer: NodemailerMailerMail
    ) { }

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenschot } = request;

        if(!type){
            throw new Error ('Type is required.')
        }
        
        if(!comment){
            throw new Error ('Comment is required.')
        }

        if(screenschot && !screenschot.startsWith('data:image/png;base64')){
            throw new Error('Formato de foto inválido!')
        }
        
        await this.feedbacksRepository.create({
            type,
            comment,
            screenschot,
        })

        await this.nodeMailer.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;" >`,
                `<p>Tipo de feedback: ${ type }<p>`,
                `<p>Comentário: ${ comment }<p>`,
                `<div>`,
            ].join('\n')
        })
    }
}