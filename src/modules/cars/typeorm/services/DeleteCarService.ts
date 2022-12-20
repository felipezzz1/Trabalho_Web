import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CarsRepository from "../CarsRepository";

interface IRequest{
    id: string;
}

export default class DeleteCarService{

    public async execute({id}: IRequest) : Promise<void>{
        const carsRepository = getCustomRepository(CarsRepository);
        const car = await carsRepository.findOne(id);
        if(!car){
            throw new AppError('Car not found.');
        }
        await carsRepository.remove(car); 
    }
}