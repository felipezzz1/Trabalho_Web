import { getCustomRepository } from "typeorm";
import CarsRepository from "../CarsRepository";
import Car from "../entities/Car";

export default class ListCarService{

    public async execute() : Promise<Car[]>{
        const carsRepository = getCustomRepository(CarsRepository);
        const cars = carsRepository.find();
        return cars;
    }
}