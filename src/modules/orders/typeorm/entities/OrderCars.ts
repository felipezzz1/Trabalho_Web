import Car from "@modules/cars/typeorm/entities/Car";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Order from "./Order";

@Entity('orders_cars')
export default class OrderCars{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @ManyToOne(()=> Order, order => order.order_cars)
    @JoinColumn({name: 'order_id'})
    order: Order;
    @ManyToOne(()=> Car, car => car.order_cars)
    @JoinColumn({name: 'car_id'})
    car: Car;
    @Column()
    order_id: string;
    @Column()
    car_id: string;
    @Column('decimal')
    price: number;
    @Column('int')
    quantity: number;
    @Column()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}