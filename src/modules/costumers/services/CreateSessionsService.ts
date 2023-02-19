import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import Costumer from "../typeorm/entities/Costumer";
import CostumersRepository from "../typeorm/repositories/CostumersRepository";

interface IRequest{
    email : string;
    password : string;
}

interface IResponse{
    costumer : Costumer;
    token : string;
}

export default class CreateSessionsService{
    public async execute({email, password} : IRequest):Promise<IResponse>{
        const costumersRepository = getCustomRepository(CostumersRepository);
        const costumer = await costumersRepository.findByEmail(email);
        if(!costumer){
            throw new AppError('Incorrect email/password combination', 401);
        }
        const passwordConfirmed = await compare(password, costumer.password);
        if(!passwordConfirmed){
            throw new AppError('Incorrect email/password combination', 401);
        }
        const token = sign({}, auth.jwt.secret, 
        {
            subject : costumer.id,
            expiresIn : auth.jwt.expiresIn
        });
        return {costumer, token};
    }
}