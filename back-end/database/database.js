const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("challengedb", "testuser", "pAssw0rd", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
