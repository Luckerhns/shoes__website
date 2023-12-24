import { Model } from "sequelize";
import { Good, Type } from "../../database/Relations";
import Brand from "../../database/models/Brand";

class GoodService {
    public static async create(dto, included?)   {
        const good = await Good.create({...dto})

        return good
    }
    public static async getOne(dto, included?) {
        const good = await Good.findOne({where : {...dto}, include: included})

        return good
    }
    public static async getAll(dto) {
        const good = await Good.findAndCountAll({where: dto, limit: 40, include: [Type, Brand]})
        return good 
    }
    public static async deleteOne(properties) {
        const good = await Good.destroy({where : properties ? properties : {}})
        return good
    }
}

export default GoodService;
