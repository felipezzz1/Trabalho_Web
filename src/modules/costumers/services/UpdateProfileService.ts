import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import Costumer from "../typeorm/entities/Costumer";
import CostumersRepository from "../typeorm/repositories/CostumersRepository";

interface IRequest{
    costumer_id : string;
    name : string;
    email : string;
    password? : string;
    old_password? : string;
}

export default class UpdateProfileService{
    public async execute({costumer_id, name, email, password, old_password} : IRequest) : Promise<Costumer>{
        const costumerRepository = getCustomRepository(CostumersRepository);
        const costumer = await costumerRepository.findById(costumer_id);
        if(!costumer){
            throw new AppError('Costumer not found.');
        }

        const costumerUpdateEmail = await costumerRepository.findByEmail(email);
        if(costumerUpdateEmail && (costumerUpdateEmail.id !== costumer.id)){
            throw new AppError('There is already one costumer with this email');
        }

        if(password && !old_password){
            throw new AppError('Old password is required');
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, costumer.password);
            if(!checkOldPassword){
                throw new AppError('Old password does not match.');
            }
            costumer.password = await hash(password, 8);
        }

        costumer.name = name;
        costumer.email = email;

        await costumerRepository.save(costumer);
        return costumer;
    }
}