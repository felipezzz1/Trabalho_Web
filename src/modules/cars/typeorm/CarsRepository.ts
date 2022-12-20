import { EntityRepository, Repository } from "typeorm";
import Car from "./entities/Car";

@EntityRepository(Car)
export default class CarsRepository extends Repository<Car>{
    public async findByPlate(plate: string): Promise<Car | undefined>{
        const car = this.findOne({
            where: { plate }
        })
        return car;
    }
}
