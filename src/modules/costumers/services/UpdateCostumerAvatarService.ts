import fs from "fs";
import AppError from "@shared/errors/AppError";
import path from "path";
import { getCustomRepository } from "typeorm";
import Costumer from "../typeorm/entities/Costumer";
import CostumersRepository from "../typeorm/repositories/CostumersRepository";
import uploadConfig from "@config/upload";

interface IRequest{
    costumer_id : string;
    avatarFileName : string;
}

export default class UpdateCostumerAvatarService{
    public async execute({costumer_id, avatarFileName}: IRequest): Promise <Costumer>{
        const costumerRepository = getCustomRepository(CostumersRepository);
        const costumer = await costumerRepository.findById(costumer_id);
        if(!costumer){
            throw new AppError('Costumer not found');
        }
        if(costumer.avatar){
            const userAvatarFilePath = path.join(uploadConfig.directory, costumer.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            if(userAvatarFileExists){
                //remove arquivo do servidor
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        costumer.avatar = avatarFileName;
        await costumerRepository.save(costumer);
        return costumer;
    }
}