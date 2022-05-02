const Category = require("../models/Category.js");

// Some categories to keep the base loaded
const inserts = async () => {
  await Category.create({ name: "Entertainment" });
  await Category.create({ name: "Transport" });
  await Category.create({ name: "Utilites" });
  await Category.create({ name: "House" });
  await Category.create({ name: "Food" });
  await Category.create({ name: "Other" });
};

module.exports = inserts;
