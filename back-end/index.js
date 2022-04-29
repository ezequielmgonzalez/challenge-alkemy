const express = require("express");
const path = require("path");
const pool = require("./db");
const cors = require("cors");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../../my-app")));

// middleware
// Allows different domains of the app to interact (localhost:5000 from the back with localhost:3000 from the front).
app.use(cors());
// Allows the use of req.body
app.use(express.json());

// Routes

// Create a movement
app.post("/movements", async (req, res) => {
  try {
    const { concept, amount, dateM, typeM } = req.body;
    const newMovement = await pool.query(
      "INSERT INTO movement (concept, amount, dateM, typeM) VALUES ($1, $2, $3, $4) RETURNING *",
      [concept, amount, dateM, typeM]
    );

    res.json(newMovement.rows[0]);
  } catch (e) {
    console.error(e.message);
  }
});

// Get all movements
app.get("/movements", async (req, res) => {
  try {
    const allMovements = await pool.query(
      "SELECT * FROM movement ORDER BY movement_id DESC"
    );
    res.json(allMovements.rows);
  } catch (e) {
    console.error(e.message);
  }
});

// Get only selected type of movements
app.get("/movements/type/:t", async (req, res) => {
  try {
    const { t } = req.params;
    const allSelected = await pool.query(
      "SELECT * FROM movement WHERE typem = $1 ORDER BY movement_id DESC",
      [t]
    );
    res.json(allSelected.rows);
  } catch (e) {
    console.error(e);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
