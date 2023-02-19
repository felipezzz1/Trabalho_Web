import { getCustomRepository } from "typeorm";
import CarsRepository from "../typeorm/repositories/CarsRepository";
import Car from "../typeorm/entities/Car";

export default class ListCarService{

    public async execute() : Promise<Car[]>{
        const carsRepository = getCustomRepository(CarsRepository);
        const cars = carsRepository.find();
        return cars;
    }
}