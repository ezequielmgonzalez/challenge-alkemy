const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");

const Movement = sequelize.define(
  "movement",
  {
    movement_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    concept: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateM: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    typeM: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Movement;
