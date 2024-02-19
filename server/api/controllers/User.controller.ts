import { validationResult } from "express-validator";
import { User } from "../../database/Relations";
import UserService from "../services/User.service";
import ErrorHandler from "../exceptions/ErrorException";
import sequelize from "../../database/db";

const refreshCookieExpires = 30 * 24 * 60 * 60 * 1000;
const dtoCookieExpires = 30 * 60 * 60 * 1000;

class UserController {
  public static async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ErrorHandler.BadRequest("Validation error", errors.array())
        );
      }
      const body = req.body;

      const user = await UserService.registration(body);
      res.cookie("user", user.user, {
        maxAge: dtoCookieExpires,
        httpOnly: true,
      });
      res.cookie("accessToken", user.accessToken, {
        maxAge: dtoCookieExpires,
        httpOnly: true,
      });
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: refreshCookieExpires,
        httpOnly: true,
      });
      
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  public static async login(req, res, next) {
    try {
      const body = req.body;
      const user = await UserService.login(body);
      if (!user) {
        return ErrorHandler.NotFound("User was not found");
      }
      res.cookie("user", user.user, {
        maxAge: dtoCookieExpires,
        httpOnly: true,
      });
      res.cookie("accessToken", user.accessToken, {
        maxAge: dtoCookieExpires,
        httpOnly: true,
      });
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: refreshCookieExpires,
        httpOnly: true,
      });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  public static async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);

      let result;
      let statusCode;

      if (token === 1) {
        result = "You logouted";
        statusCode = 200;
      } else {
        result = "Incorrect query";
        statusCode = 404;
      }

      res.clearCookie("refreshToken");
      console.log(result);
      return res.status(statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  public static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  public static async getAll(req, res, next) {
    try {
      const body = req.body;
      const users = await UserService.getAll(body);

      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
  public static async getOne(req, res, next) {}
  public static async deleteOne(req, res, next) {}
}

export default UserController;
