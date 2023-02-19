import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('costumer_tokens')
export default class CostumerTokens{
    @PrimaryGeneratedColumn('uuid')
    id : string;
    @Column()
    @Generated('uuid')
    token : string;
    @Column()
    costumer_id : string;
    @CreateDateColumn()
    created_at : Date;
    @UpdateDateColumn()
    updated_at : Date;
}