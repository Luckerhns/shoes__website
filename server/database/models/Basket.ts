import { DataTypes } from "sequelize";
import sequelize from "../db";

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

export default Basket;
