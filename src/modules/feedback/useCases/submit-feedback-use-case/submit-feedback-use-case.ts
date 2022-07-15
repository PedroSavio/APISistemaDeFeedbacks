import { NodemailerMailerMail } from "../../../../providers/mailer/implementations/nodemailer";
import { FeedbacksRepository } from "../../../../repositories/feedbacks-repository";
import { IMailProvider } from "../../../../providers/mailer/IMailProvider";

export interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenschot?: string;
}

export interface ISubmitFeedbackUseCase {
    execute: (request: SubmitFeedbackUseCaseRequest) => Promise<void>
}

//Principio SOLID Inversao de classe (Classe não depende necessariamente do prisma)
export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailProvider: IMailProvider,
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

        await this.mailProvider.sendMail({
            to: {
                name: 'Savio',
                email: 'savio.example@gmail.com'
            },
            from: {
                name: 'Savio2',
                email: 'savio2.example@gmail.com'
            },
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