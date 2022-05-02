const express = require("express");
const path = require("path");
// const pool = require("./database/db");
const cors = require("cors");

const sequelize = require("./database/database.js");

// Chequear si puedo cambiarlo:
const { Op } = require("sequelize");

const Movement = require("./models/Movement.js");
const Category = require("./models/Category.js");
const inserts = require("./database/inserts.js");
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../../my-app")));

// middleware
// Allows different domains of the app to interact (localhost:5000 from the back with localhost:3000 from the front).
app.use(cors());
// Allows the use of req.body
app.use(express.json());

// Routes

// Create a movement (sequelize)
app.post("/movements", async (req, res) => {
  try {
    const { concept, amount, dateM, typeM, categoryId } = req.body;
    const newMovement = await Movement.create({
      concept,
      amount,
      dateM,
      typeM,
      categoryId,
    });

    res.json(newMovement);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// Get filtered movements (sequelize)
app.get("/movements/filters", async (req, res) => {
  try {
    filters = req.query;
    let conditions = {};
    if (filters.type) {
      conditions["typeM"] = filters.type;
    }
    if (filters.category) {
      conditions["categoryId"] = filters.category;
    }
    const filteredMovements = await Movement.findAll({
      where: {
        [Op.and]: {
          // Both filters: "SELECT * FROM movement WHERE typem = $1 AND category = $2 ORDER BY movement_id DESC"
          // Only type filter: "SELECT * FROM movement WHERE typem = $1 ORDER BY movement_id DESC"
          // typeM: filters.type,
          // Only category filter: "SELECT * FROM movement WHERE category = $1 ORDER BY movement_id DESC",
          // categoryId: filters.category,
          ...conditions,
        },
      },
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
      order: [["movement_id", "DESC"]],
    });
    res.json(filteredMovements);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// Gel all movements (sequelize)
app.get("/movements", async (req, res) => {
  try {
    const allMovements = await Movement.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });
    res.json(allMovements);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// Get last 10 (quantity) movements (sequelize)
app.get("/movements/last/:q", async (req, res) => {
  try {
    const { q } = req.params;
    // SELECT * FROM movement ORDER BY movement_id DESC LIMIT {q}
    const allMovements = await Movement.findAll({
      attributes: ["concept", "amount", "dateM", "typeM"],
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
      order: [["movement_id", "DESC"]],
      limit: q,
    });
    res.json(allMovements);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// Get total balance from all movements (sequelize)
app.get("/movements/balance", async (req, res) => {
  try {
    const allIncomes = await Movement.findAll({
      attributes: [[sequelize.fn("SUM", sequelize.col("amount")), "total"]],
      where: {
        typeM: "I",
      },
    });
    const allOutcomes = await Movement.findAll({
      attributes: [[sequelize.fn("SUM", sequelize.col("amount")), "total"]],
      where: {
        typeM: "O",
      },
    });
    const totalBalance =
      allIncomes[0].dataValues.total - allOutcomes[0].dataValues.total;
    res.json(totalBalance);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// Get a movement (sequelize)
app.get("/movements/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movement = await Movement.findByPk(id);

    if (!movement)
      return res.status(404).json({ message: "Movement does not exist" });

    res.json(movement);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// Update a movement (sequelieze)
app.put("/movements/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { concept, amount, dateM, categoryId } = req.body;
    const updateMovement = await Movement.findByPk(id);
    updateMovement.concept = concept;
    updateMovement.amount = amount;
    updateMovement.dateM = dateM;
    updateMovement.categoryId = categoryId;
    await updateMovement.save();

    res.json(updateMovement);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// Delete a movement (sequelize)
app.delete("/movements/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Movement.destroy({
      where: {
        movement_id: id,
      },
    });
    return res.sendStatus(204);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// Create a category (sequelize)
app.post("/categories", async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({
      name,
    });

    res.json(newCategory);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// Gel all categories (sequelize)
app.get("/categories", async (req, res) => {
  try {
    const allCategories = await Category.findAll();
    res.json(allCategories);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// Get a category (sequelize)
app.get("/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category)
      return res.status(404).json({ message: "Category does not exist" });

    res.json(category);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// Update a category (sequelieze)
app.put("/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateCategory = await Category.findByPk(id);
    updateCategory.name = name;
    await updateCategory.save();

    res.json(updateCategory);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// Delete a category (sequelize)
app.delete("/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Category.destroy({
      where: {
        category_id: id,
      },
    });
    return res.sendStatus(204);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

async function main() {
  try {
    // with sync and "force: true", Sequelize forces the creation of tables even if they are already created (i.e. overwrites them).
    // you can put force on false so the creation of tables only happens if those aren't created yet.
    await sequelize.sync({ force: true });
    await inserts();
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}
main();
