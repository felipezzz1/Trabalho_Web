import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CarsRepository from "../CarsRepository";
import Car from "../entities/Car";


interface IRequest{
    id: string;
    model : string;
    color : string;
    plate : string;
    mileage : number;
    seats : number;
    price : number;
    year : number;
}

export default class UpdateCarService{

    public async execute({id, model, color, plate, mileage, seats, price, year}: IRequest) : Promise<Car>{
        const carsRepository = getCustomRepository(CarsRepository);
        const car = await carsRepository.findOne(id);
        if(!car){
            throw new AppError('Car not found.');
        }

        const carExists = await carsRepository.findByPlate(plate);
        if(carExists && plate != car.plate){
            throw new AppError('There is already one car with this plate.');
        }
        car.model = model;
        car.color = color;
        car.plate = plate;
        car.mileage = mileage;
        car.seats = seats;
        car.price = price;
        car.year = year;

        await carsRepository.save(car);

        return car;
    }
}
