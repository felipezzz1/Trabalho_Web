import { EntityRepository, In, Repository } from "typeorm";
import Car from "../entities/Car";

interface IFindCars{
    id:string;
}

@EntityRepository(Car)
export default class CarsRepository extends Repository<Car>{
    public async findByPlate(plate: string): Promise<Car | undefined>{
        const car = this.findOne({
            where: { plate }
        })
        return car;
    }

    public async findAllByIds(cars: IFindCars[]):
    Promise<Car[]>{
        const carIds = cars.map(car => car.id);
        const existsCars = await this.find({
            where:{ id : In(carIds)}
        })
        return existsCars;
    }

}
