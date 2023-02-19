import EtherealMail from "@config/mail/EtherealMail";
import AppError from "@shared/errors/AppError";
import path from "path";
import { getCustomRepository } from "typeorm";
import CostumersRepository from "../typeorm/repositories/CostumersRepository";
import CostumerTokensRepository from "../typeorm/repositories/CostumerTokensRepository";

interface IRequest{
    email : string;
}

export default class SendForgotPasswordEmailService{
    public async execute({email} : IRequest) : Promise<void>{
        const costumerRepository = getCustomRepository(CostumersRepository);
        const costumerTokensRepository = getCustomRepository(CostumerTokensRepository);
        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');
        const costumer = await costumerRepository.findByEmail(email);
        if(!costumer){
            throw new AppError('Costumer does not exists.');
        }

        const {token} = await costumerTokensRepository.generate(costumer.id);
        console.log(token);
        await EtherealMail.sendMail({
            to: {
                name : costumer.name,
                email : costumer.email
            },
            subject : '[CAR RENTING] - Recover Password',
            templateData : {
                file : forgotPasswordTemplate,
                variables : {
                    name : costumer.name,
                    link : `http://localhost:3333/reset_password?token=${token}`
                }
            }
        })
    }
}