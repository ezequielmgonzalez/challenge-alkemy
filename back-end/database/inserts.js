const Category = require("../models/Category.js");
const Movement = require("../models/Movement.js");

// Some categories to keep the base loaded
const inserts = async () => {
  await Category.create({ name: "Entertainment" });
  await Category.create({ name: "Transport" });
  await Category.create({ name: "Utilites" });
  await Category.create({ name: "House" });
  await Category.create({ name: "Food" });
  await Category.create({ name: "Other" });

  await Movement.create({
    amount: 22,
    concept: "Netflix",
    typeM: "O",
    dateM: "02-22-2022",
    categoryId: 1,
  });
  await Movement.create({
    amount: 3000,
    concept: "Race",
    typeM: "I",
    dateM: "05-10-2022",
    categoryId: 6,
  });
  await Movement.create({
    amount: 100,
    concept: "Wifi",
    typeM: "O",
    dateM: "10-22-2022",
    categoryId: 3,
  });
  await Movement.create({
    amount: 30,
    concept: "HBO MAX",
    typeM: "O",
    dateM: "02-22-2022",
    categoryId: 1,
  });
};

module.exports = inserts;
