export interface FeedbacksCreateData {
    type: string;
    comment: string;
    screenschot?: string;
}

export interface FeedbacksRepository {
    create: (data: FeedbacksCreateData) => Promise<void>;
}