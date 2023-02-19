import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CostumersRepository from "../typeorm/repositories/CostumersRepository";
import CostumerTokensRepository from "../typeorm/repositories/CostumerTokensRepository";
import { isAfter, addHours } from "date-fns";  
import { hash } from "bcryptjs";

interface IRequest{
    token : string;
    password : string;
}

export default class ResetPasswordService{
    public async execute({token, password} : IRequest) : Promise<void>{
        const costumerRepository = getCustomRepository(CostumersRepository);
        const costumerTokensRepository = getCustomRepository(CostumerTokensRepository);

        const costumerToken = await costumerTokensRepository.findByToken(token);
        if(!costumerToken){
            throw new AppError('Costumer token does not exists.');
        }

        const costumer = await costumerRepository.findById(costumerToken.costumer_id);
        if(!costumer){
            throw new AppError('Costumer does not exists.');
        }

        const tokenCreatedAt = costumerToken.created_at;
        const compareDate = addHours(tokenCreatedAt,2);

        if(isAfter(Date.now(), compareDate)){
            throw new AppError('Token expired.');
        }

        costumer.password = await hash(password, 8);
        await costumerRepository.save(costumer);
    }
}