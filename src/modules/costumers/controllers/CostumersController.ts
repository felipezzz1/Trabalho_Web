import { Request, Response } from "express";
import CreateCostumerService from "../services/CreateCostumerService";
import ListCostumerService from "../services/ListCostumerService";

export default class CostumersController{

    public async index(request: Request, response: Response): Promise<Response>{
      const listCostumer = new ListCostumerService();
      console.log(request.costumer.id);
      const costumers = await listCostumer.execute();
      return response.json(costumers);
    }
  
    public async create(request: Request, response: Response): Promise<Response>{
      const {name, email, password} = request.body;
      const createCostumer = new CreateCostumerService();
      const costumer = await createCostumer.execute({name, email, password});
      return response.json(costumer);
    }
}
  