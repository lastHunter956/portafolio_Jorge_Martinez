declare module 'sib-api-v3-sdk' {
    export class TransactionalEmailsApi {
      sendTransacEmail(email: any): Promise<any>;
      authentications: { [key: string]: { apiKey: string } };
    }
  }