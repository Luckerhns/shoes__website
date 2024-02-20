import { v4 } from "uuid";
import { Model, Good, Size, Type } from "../../database/Relations";
import Brand from "../../database/models/Brand";
import ErrorHandler from "../exceptions/ErrorException";
import { ModelException } from "../exceptions/ModelException";
import BrandService from "../services/Brand.service";
import ModelService from "../services/Model.service";
import SeasonService from "../services/Season.service";
import GoodService from "../services/Good.service";
import SizeService from "../services/Size.service";
import TypeService from "../services/Type.service";
import { IGoodParams } from "../../types/params";
import Season from "../../database/models/Season";
import { Request, Response } from "express";
import path from "path";

class GoodController {
  public static async createNew(req: Request, res: Response, next) {
    try {
      const { good, type, price, brand, model, season, size }: IGoodParams =
        req.body;

      // @ts-ignore
      const { img } = req.files;

      let filename = v4() + ".png";
      img.mv(path.resolve(__dirname, "..", "static", filename));

      const _type = await TypeService.getOne({ type: type });

      const _brand = await BrandService.getOne({ brand: brand });

      const _season = await SeasonService.getOne({ season: season });

      const _model = await ModelService.getOne({ model: model });

      const _size = await SizeService.create({ size: size });

      const models = [_type, _brand, _size, _model];

      for (let i = 0; i < models.length; i++) {
        if (!models[i]) {
          throw new ModelException(404, `Model #${i} is undefined`);
        }
      }

      const _good = await GoodService.create({
        good: good,
        price: price,
        // typeId: _type.dataValues.id,
        // brandId: _brand.dataValues.id,
        // seasonId: _season.dataValues.id,
        // sizeId: _size.dataValues.id,
        // modelId: _model.dataValues.id,
        img: filename,
      });

      // const _good = await Good.create({
      //   good: 'asadas',
      //   price: 1100.00,
      //   img: filename
      // })

      // const newgood = await GoodService.getOne(
      //   { good: _good.dataValues.good },
      //   [Type, Brand, Size, Model]
      // );

      return res.json(_good);
    } catch (error) {
      next(error);
    }
  }
  public static async getOne(req, res, next) {}
  public static async getAll(req, res, next) {
    const params = req.body;
    const good = await GoodService.getAll({ ...params });

    return res.json(good);
  }
  public static async deleteOne(req, res, next) {}
}

export default GoodController;
