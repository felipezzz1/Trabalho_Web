import { EntityRepository, Repository } from "typeorm";
import CostumerTokens from "../entities/CostumerTokens";

@EntityRepository(CostumerTokens)
export default class CostumerTokensRepository extends Repository<CostumerTokens> {
    public async findByToken(token : string) : Promise<CostumerTokens | undefined>{
        const costumerToken = await this.findOne({
            where : { token }
        });
        return costumerToken;
    }

    public async generate(costumer_id : string): Promise<CostumerTokens>{
        const costumerToken = await this.create({
            costumer_id
        });
        await this.save(costumerToken);
        return costumerToken;
    }

}