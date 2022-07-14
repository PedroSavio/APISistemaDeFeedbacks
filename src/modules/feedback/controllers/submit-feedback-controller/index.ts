import SubmitFeedbackController from "./submit-feedback-controller";
import SubmitFeedbackUseCase  from "../../useCases/submit-feedback-use-case/";

export default new SubmitFeedbackController(SubmitFeedbackUseCase)