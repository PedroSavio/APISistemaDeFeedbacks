export interface FeedbacksCreateData {
    type: string;
    comment: string;
    screenschot?: string;
}

export interface FeedbacksRepository {
    create: (feedbackInfo: FeedbacksCreateData) => Promise<void>
}