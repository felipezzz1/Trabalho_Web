import { Request, Response } from "express";
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";

export default class ProfileController{
    public async show(request : Request, response : Response) : Promise<Response>{
        const showProfile = new ShowProfileService();
        const costumer_id = request.costumer.id;
        const costumer = await showProfile.execute({costumer_id});
        return response.json(costumer);
    }

    public async update(request : Request, response : Response) : Promise<Response>{
        const costumer_id = request.costumer.id;
        const {name, email, password, old_password} = request.body;
        const updateProfile = new UpdateProfileService();
        const costumer = await updateProfile.execute({costumer_id, name, email, password, old_password});
        return response.json(costumer);
    }

}