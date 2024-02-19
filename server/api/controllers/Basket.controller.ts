import { Size, Type } from "../../database/Relations";
import Brand from "../../database/models/Brand";
import Season from "../../database/models/Season";
import BasketService from "../services/Basket.service";
import ShoesService from "../services/Good.service";
import UserService from "../services/User.service";

export default class BasketController {
  public static async addToBasket(req, res, next) {
    try {
      const goodId = req.body.goodId;
      const userId = req.body.userId;

      // const good = await ShoesService.getOne({ id: goodId }, [Type, Brand, Size, Season]);

      const goodInBasket = await BasketService.addToBasket(goodId, userId)

      return res.json(goodInBasket);
    } catch (error) {
      next(error);
    }
  }

  public static async getUserBasket(req, res, next) {
    try {
      
      const userId = req.body.userId
      const basket = await BasketService.getUserBasket(userId)
      console.log(basket)
      
      return res.json(basket)
    } catch (error) {
      next(error)
    }
  }

  public static async removeFromBasket(req, res, next) {}
}
