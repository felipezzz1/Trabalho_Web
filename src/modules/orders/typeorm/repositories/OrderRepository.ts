import Customer from "@modules/customers/typeorm/entities/Customer";
import { EntityRepository, Repository } from "typeorm";
import Order from "../entities/Order";

interface ICar{
    car_id: string;
    price: number;
    quantity: number;
}

interface IRequest{
    customer: Customer;
    cars: ICar[];
}

@EntityRepository(Order)
export default class OrderRepository extends Repository<Order>{
    
    public async findById(id: string): Promise<Order | undefined>{
        const order = this.findOne(id, {
            relations: ['order_cars', 'customer']
        });
        return order;
    }

    public async createOrder({customer, cars} : IRequest):
        Promise<Order>{
            const order = this.create({customer, order_cars: cars});
            await this.save(order);
            return order;
        }
}