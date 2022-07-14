import { Router } from 'express';
import { feedbackRoutes } from './modules/feedback/feedback.routes';

export const routes = Router()


routes.use('/feedbacks', feedbackRoutes)
