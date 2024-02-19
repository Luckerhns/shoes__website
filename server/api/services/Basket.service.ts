import { Basket, Order, Type } from "../../database/Relations";
import Brand from "../../database/models/Brand";
import ShoesController from "../controllers/Good.controller";
import { ModelException } from "../exceptions/ModelException";
import ShoesService from "./Good.service";
import UserService from "./User.service";

export default class BasketService {
  public static async addToBasket(goodId, userId) {
    try {
      const basket = await Basket.create({ userId: userId, goodId: goodId }).catch(e => console.log(e))

      return basket;
    } catch (error) {
      throw ModelException.ModelExists('Модель с такими данными уже в корзине')
    }
  }

  public static async getUserBasket(userId) {
    try {
      const usersBasket = await Basket.findAndCountAll({
        where: { userId: userId }, include: [Brand, Type]
      });

      return usersBasket;
    } catch (error) {
      console.log(error);
    }
  }

  public static async removeFromBasket(req, res, next) {}
}
