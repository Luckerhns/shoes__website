import ErrorHandler from "../exceptions/ErrorException";
import { hash } from "bcrypt";
import { v4 } from "uuid";
import MailService from "./dependecies/Mail.service";
import TokenService from "./dependecies/Token.service";
import UserDto from "../dto/user-dto";
import { compare } from "bcrypt";
import UserController from "../controllers/User.controller";
import { validationResult } from "express-validator";
import { User } from "../../database/Relations";

class UserService {
  // REGISTRATION

  public static async registration(dto) {
    try {
      const email = dto.email;
      const password = dto.password;
      const username = dto.username;
      const role = dto.role;

      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        throw ErrorHandler.BadRequest("User with this email alredy exists");
      }
      const hashPassword = await hash(password, 3);
      const activationLink = await v4();

      //ADMIN CREATE
      if (email === "AdminGmail@gmail.com") {
        const user = await User.create({
          ...dto,
          password: hashPassword,
          activationLink: activationLink,
          firstname: username[0],
          lastname: username[1],
          role: "ADMIN",
        });
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await MailService.sendActivationMail(
          email,
          `${process.env.API_URL}/api/activate/${activationLink}`
        );
        console.log(username);
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: user };
      }

      // USER CREATE
      else {
        const user = await User.create({
          ...dto,
          password: hashPassword,
          activationLink: activationLink,
          firstname: username[0],
          lastname: username[1],
          role: role ? role : "USER"
        });

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await MailService.sendActivationMail(
          email,
          `${process.env.API_URL}/api/activate/${activationLink}`
        );
        console.log(username);
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: user };
      }
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  // LOGIN

  public static async login(dto) {
    try {
      const password = dto.password;
      const email = dto.email;
      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        throw ErrorHandler.NotFound("Пользователь с таким email не найден");
      }

      const isEquals = await compare(password, user.dataValues.password);
      if (!isEquals) {
        throw ErrorHandler.BadRequest("Неправильный пароль");
      }

      const userDto = new UserDto(user);
      const tokens = TokenService.generateTokens({ ...userDto });
      await TokenService.saveToken(userDto.id, tokens.refreshToken);
      return { ...tokens, user: user };
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  // LOGOUT

  public static async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  public static async refresh(refreshToken) {
    if (!refreshToken) {
      throw ErrorHandler.UnauthorizedError("Incorrect refresh token");
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);

    if (!userData) {
      throw ErrorHandler.UnauthorizedError("Cannot find token or user");
    }

    const user = await User.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  public static async getAll(dto) {
    const users = User.findAll();
    return users;
  }

  public static async deleteOne(req, res, next) {}
}

export default UserService;
