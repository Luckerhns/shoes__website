import Address from "./models/Address";
import Employee from "./models/Employee";
import Model from "./models/Model";
import Order from "./models/Order";
import Photo from "./models/Photo";
import Position from "./models/Position";
import Type from "./models/Type";
import User from "./models/User";
import Season from "./models/Season";
import Brand from "./models/Brand";
import Token from "./models/Token";
import Size from "./models/Size";
import Basket from "./models/Basket";
import Good from "./models/Good";

//USER

User.hasMany(Address);
Address.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Token);
Token.belongsTo(User);

User.belongsToMany(Good, { through: "basket" });
Good.belongsToMany(User, { through: "basket" });

//ORDER

Order.hasMany(Employee);
Employee.belongsToMany(Order, { through: "employee_order" });

Brand.hasMany(Basket)
Basket.belongsTo(Brand)

Type.hasMany(Basket)
Basket.belongsTo(Type)

Employee.belongsTo(Position);
Position.hasMany(Employee);

Order.hasMany(Good);
Good.belongsTo(Order);

Order.hasOne(Basket);
Basket.belongsTo(Order);

//Good + PHOTO

Good.hasMany(Photo);
Photo.belongsTo(Good);

//Good + SEASON

// Good.belongsToMany(Season, {
//     through: "Good_season"
// });

// Season.belongsToMany(Good, {
//     through: "Good_season"
// });

Season.belongsToMany(Model, {
  through: "model_season",
});

Season.belongsToMany(Brand, {
  through: "brand_season",
});

//Good + TYPE

Good.belongsTo(Type, {
  foreignKey: "typeId",
});

Type.hasMany(Good, {
  foreignKey: "typeId",
});

Type.belongsTo(Season);

Type.hasMany(Model);

Type.belongsToMany(Brand, {
  through: "type_brand",
});

//Good + MODEL

Good.belongsTo(Model, {
  foreignKey: "modelId",
});

Model.hasMany(Good, {
  foreignKey: "modelId",
});

Model.belongsTo(Type);

Model.belongsToMany(Season, {
  through: "model_season",
});

//Good + SIZE

Size.hasOne(Good);

Good.belongsTo(Size);

//Good + BRAND

Good.belongsTo(Brand, {
  foreignKey: "brandId",
});

Brand.hasMany(Good, {
  foreignKey: "brandId",
});

Brand.hasMany(Model);

Model.belongsTo(Brand);

Brand.belongsToMany(Type, {
  through: "type_brand",
});

Brand.belongsToMany(Season, {
  through: "brand_season",
});

export {
  Address,
  Basket,
  Employee,
  Model,
  Order,
  Photo,
  Position,
  Good,
  Type,
  User,
  Size,
};
