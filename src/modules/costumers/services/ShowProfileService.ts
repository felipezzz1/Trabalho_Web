import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Costumer from "../typeorm/entities/Costumer";
import CostumersRepository from "../typeorm/repositories/CostumersRepository";

interface IRequest{
    costumer_id : string;
}
export default class ShowProfileService{
    public async execute({costumer_id} : IRequest) : Promise<Costumer>{
        const costumerRepository = getCustomRepository(CostumersRepository);
        const costumer = await costumerRepository.findById(costumer_id);
        if(!costumer){
            throw new AppError('Costumer not found.');
        }
        return costumer;
    }
}