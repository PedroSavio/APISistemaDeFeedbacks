import { Router } from "express"
import SubmitFeedbackController from "./controllers/submit-feedback-controller/"

export const feedbackRoutes = Router()



feedbackRoutes.post('/', SubmitFeedbackController.handle)


