import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('cars')
export default class Product{
    @PrimaryGeneratedColumn('uuid')
    id: string;
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
    year : number;
    @CreateDateColumn()
    created_at : Date;
    @UpdateDateColumn()
    updated_at : Date;
}
