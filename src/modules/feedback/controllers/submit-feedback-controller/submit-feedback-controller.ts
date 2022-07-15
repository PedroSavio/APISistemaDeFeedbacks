import { Request, Response } from "express";
import { ISubmitFeedbackUseCase } from "../../useCases/submit-feedback-use-case/submit-feedback-use-case";
import * as Yup from 'yup'

export default class SubmitFeedbackController {


    constructor(
        private SubmitFeedbackUsecase: ISubmitFeedbackUseCase
    ) { }


 handle = async (req: Request, res: Response) =>  {

    const submitFeedbackSchema = Yup.object().shape({
        type: Yup.string().required('Type is mandatory!'),
        comment: Yup.string().required('Comment is mandatory!'),
        screenschot: Yup.string().optional()
    })

    try{
        await submitFeedbackSchema.validate(req.body)
    }
    catch (err: any){
        return res.status(400).json({
            msg: err.errors[0] 
        })
    }

    const { type, comment, screenschot } = req.body

    try{
        await this.SubmitFeedbackUsecase.execute({
            type,
            comment,
            screenschot
        })
    
        res.status(201).send();
    }
    catch (err: any) {
        return res.status(400).json({
            msg: err.message
        })
    }

}

}