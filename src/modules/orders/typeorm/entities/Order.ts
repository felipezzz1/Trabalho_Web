import Customer from "@modules/customers/typeorm/entities/Customer";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import OrderCars from "./OrderCars";

@Entity('orders')
export default class Order{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @ManyToOne(()=> Customer)
    @JoinColumn({name: 'customer_id'})
    customer: Customer;
    @OneToMany(()=> OrderCars, order_cars => 
        order_cars.order,{cascade:true})
    order_cars: OrderCars[];
    @Column()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}