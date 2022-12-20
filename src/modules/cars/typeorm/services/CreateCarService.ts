import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CarsRepository from "../CarsRepository";
import Car from "../entities/Car";

interface IRequest{
    model : string;
    color : string;
    plate : string;
    mileage : number;
    seats : number;
    price : number;
    year : number;
}

export default class CreateCarService{

    public async execute({model, color, plate, mileage, seats, price, year}: IRequest) : Promise<Car>{
        const carsRepository = getCustomRepository(CarsRepository);
        
        const carExists = await carsRepository.findByPlate(plate);
        if(carExists){
            throw new AppError('There is already one car with this plate.');
        }

        const car = carsRepository.create({
            model, color, plate, mileage, seats, price, year
        });

        await carsRepository.save(car);
        return car;
    }
}
