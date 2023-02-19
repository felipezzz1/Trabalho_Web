import { Request, Response } from "express";
import UpdateCostumerAvatarService from "../services/UpdateCostumerAvatarService";

export default class CostumerAvatarController{
    public async update(request : Request, response : Response) : Promise <Response>{
        const updateAvatar = new UpdateCostumerAvatarService();
        const costumer = updateAvatar.execute({
            costumer_id : request.costumer.id,
            avatarFileName : request.file?.filename as string
        });
        return response.json(costumer);
    }
}