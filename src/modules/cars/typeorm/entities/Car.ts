import OrderCars from '@modules/orders/typeorm/entities/OrderCars';
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('cars')
export default class Car{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @OneToMany(()=> OrderCars , order_cars => 
            order_cars.car)
    order_cars: OrderCars[];
    @Column()
    model : string;
    @Column()
    color : string;
    @Column()
    plate : string;
    @Column('decimal')
    mileage : number;
    @Column('int')
    seats : number;
    @Column('decimal')
    price : number;
    @Column('int')
    quantity : number;
    @Column('int')
    year : number;
    @CreateDateColumn()
    created_at : Date;
    @UpdateDateColumn()
    updated_at : Date;
}
