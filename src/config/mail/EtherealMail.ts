import nodemailer from 'nodemailer';
import HandlebarMailTemplate from './HandlebarMailTemplate';

interface ISendMail{
    to:IMailContact;
    from?:IMailContact;
    subject:string;
    templateData: IParseMailTemplate;
}

interface ITemplateVariable{
    [key:string]:string|number;
}

interface IMailContact{
    name: string;
    email:string;
}

interface IParseMailTemplate{
    file:string;
    variables: ITemplateVariable;
}

export default class EtherealMail{
    static async sendMail({to,from, subject,templateData}:ISendMail):Promise<void>{
        const account = await nodemailer.createTestAccount();
        const mailTemplate = new HandlebarMailTemplate();
        const transporter = await nodemailer.createTransport({
            host:account.smtp.host,
            port:account.smtp.port,
            auth:{
                user:account.user,
                pass:account.pass
            }
        });
        const message = await transporter.sendMail({
            from: {
                name:from?.name || 'Equipe ApiVendas',
                address: from?.email || 'equipe_vendas@apiVendas.com.br'
            },
            to:{
                name:to.name,
                address: to.email
            },
            subject,
            html:await mailTemplate.parse(templateData)
        });
        console.log('Message Sent: '+message.messageId);
        console.log('Preview URL: '+nodemailer.getTestMessageUrl(message));
    }
}