export interface SendMailData {
    subject: string;
    body: string;
}



export interface Mail {
    sendMail: (data: SendMailData) => Promise<void>;
}