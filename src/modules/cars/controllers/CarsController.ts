import { Request, Response } from "express";
import CreateCarService from "../services/CreateCarService";
import DeleteCarService from "../services/DeleteCarService";
import ListCarService from "../services/ListCarService";
import ShowCarService from "../services/ShowCarService";
import UpdateCarService from "../services/UpdateProductService";

export default class CarsController{
    public async index(request: Request, response: Response): Promise<Response>{
        const listCars = new ListCarService();
        const cars = await listCars.execute();
        return response.json(cars);
    }

    public async show(request: Request, response: Response): Promise<Response>{
        const { id } = request.params;
        const showCar = new ShowCarService();
        const car = await showCar.execute({id});
        return response.json(car);
    }

    public async create(request: Request, response: Response): Promise<Response>{
        const { model, color, plate, mileage, seats, price, quantity, year } = request.body;
        const createCar = new CreateCarService();
        const car = await createCar.execute( {model, color, plate, mileage, seats, price, quantity, year});
        return response.json(car);
    }

    public async update(request: Request, response: Response): Promise<Response>{
        const { model, color, plate, mileage, seats, price, quantity, year } = request.body;
        const { id } = request.params;
        const updateCar = new UpdateCarService();
        const car = await updateCar.execute( {id, model, color, plate, mileage, seats, price, quantity, year});
        return response.json(car);
    }

    public async delete(request: Request, response: Response): Promise<Response>{
        const { id } = request.params;
        const deleteCar = new DeleteCarService();
        await deleteCar.execute( { id });
        return response.json([]);
    }
}
