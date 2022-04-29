const express = require("express");
const path = require("path");

const cors = require("cors");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../../my-app")));

// middleware
// Allows different domains of the app to interact (localhost:5000 from the back with localhost:3000 from the front).
app.use(cors());
// Allows the use of req.body
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
