const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");
const Movement = require("./Movement");

const Category = sequelize.define(
  "category",
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Category.hasMany(Movement, {
  foreignKey: "categoryId",
  sourceKey: "category_id",
});

Movement.belongsTo(Category, {
  foreignKey: "categoryId",
  targetId: "category_id",
});

module.exports = Category;
