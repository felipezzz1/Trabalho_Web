import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import CarRepository from "@modules/cars/typeorm/repositories/CarsRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrderRepository from "../typeorm/repositories/OrderRepository";

interface ICar{
    id: string;
    quantity: number;
}

interface IRequest{
    customer_id: string;
    cars: ICar[];
}

export default class CreateOrderService{
    
    public async execute({customer_id, cars}: IRequest): Promise<Order>{
        const ordersRepository = getCustomRepository(OrderRepository);
        const customerRepository = getCustomRepository(CustomersRepository);
        const carRepository = getCustomRepository(CarRepository);

        const customerExists = await customerRepository.findById(customer_id);
        if(!customerExists){
            throw new AppError('Could not find any customer with the given ids.');
        }

        const existsCars = await carRepository.findAllByIds(cars);
        if(!existsCars.length){
            throw new AppError('Could not find any cars with the given ids.');
        }
        
        const existsCarsIds = existsCars.map((car) => car.id);
        const checkInexistentCars = cars.filter(
            car => !existsCarsIds.includes(car.id)
        )
        if(!existsCarsIds.length){
            throw new AppError(`Could not find car ${checkInexistentCars[0].id}`);
        }

        const quantityAvailable = cars.filter(
            car => existsCars.filter(
                c => c.id === car.id
            )[0].quantity < car.quantity
        );
        if(quantityAvailable.length){
            throw new AppError(`The quantity ${quantityAvailable[0].quantity}
            is not available for ${quantityAvailable[0].id}`)
        }

        const serializerCars = cars.map(car => ({
            car_id : car.id,
            quantity: car.quantity,
            price: existsCars.filter(c => 
                c.id === car.id)[0].price
        }))

        const order = await ordersRepository.createOrder({
            customer: customerExists,
            cars: serializerCars
        });

        const {order_cars} = order;
        const updateCarQuantity = order_cars.map(car=>({
          id: car.car_id,
          quantity: existsCars.filter(ca =>
            ca.id === car.car_id)[0].quantity - car.quantity
        }));

        await carRepository.save(updateCarQuantity);
        return order;


    }


}