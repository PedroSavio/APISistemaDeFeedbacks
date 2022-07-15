import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

//espioes
const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    { create: async () => { createFeedbackSpy } },
    { sendMail: async () => { sendMailSpy } }
)

describe('Submit feedback', () => {
    it('Should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenschot: 'data:image/png;base64, teste teste'
        })).resolves.not.toThrow()
    });

    it('Should be able to submit a feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenschot: 'data:image/png;base64, teste teste'
        })).rejects.toThrow()
    });

    it('Should be able to submit a feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenschot: 'data:image/png;base64, teste teste'
        })).rejects.toThrow()
    });

    it('Should be able to submit a feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenschot: 'teste unit'
        })).rejects.toThrow()
    });
});

//Quando chamar a função submitFeedback vai passar os parametro e resolves.not.toThrow significa que não deve disparar nenhum erro