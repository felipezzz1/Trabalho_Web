import { getCustomRepository } from "typeorm";
import Costumer from "../typeorm/entities/Costumer";
import CostumersRepository from "../typeorm/repositories/CostumersRepository";

export default class ListCostumerService{

    public async execute() : Promise<Costumer[]>{
      const costumersRepository = getCustomRepository(CostumersRepository);
  
      const costumers = await costumersRepository.find();
  
      return costumers;
    }
  }
  