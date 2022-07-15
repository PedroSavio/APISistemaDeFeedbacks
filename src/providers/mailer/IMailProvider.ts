export interface IEmailInfo {
    email: string,
    name: string,
}


export interface IRequestMail {
    to: IEmailInfo,
    from: IEmailInfo
    subject: string;
    body: string;
}



export interface IMailProvider {
    sendMail: (EmailInfo: IRequestMail) => Promise<void>;
}