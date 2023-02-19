import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import Costumer from "../typeorm/entities/Costumer";
import CostumersRepository from "../typeorm/repositories/CostumersRepository";

interface IRequest{
    name : string;
    email : string;
    password : string;
}

export default class CreateCostumerService{
    public async execute({name, email, password}: IRequest) : Promise<Costumer>{
        const costumersRepository = getCustomRepository(CostumersRepository);
        const emailExists  = await costumersRepository.findByEmail(email);
        if(emailExists){
          throw new AppError('Email address already used');
        }
        const hashedPassword = await hash(password,8);
        const costumer = costumersRepository.create({name, email, password : hashedPassword});
        await costumersRepository.save(costumer);
        return costumer;
      }
    
}