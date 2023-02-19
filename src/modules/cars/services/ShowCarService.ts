import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CarsRepository from "../typeorm/repositories/CarsRepository";
import Car from "../typeorm/entities/Car";

interface IRequest{
    id: string;
}

export default class ShowCarService{

    public async execute({id}: IRequest) : Promise<Car>{
        const carsRepository = getCustomRepository(CarsRepository);
        const car = await carsRepository.findOne(id);
        if(!car){
            throw new AppError('Car not found.');
        }
        return car;
    }
}