const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
const voterRoutes = require("./routes/voterRoutes");
const app = express();
require("dotenv").config();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("starred");
});
app.use("/voter", voterRoutes);
app.listen(PORT, () => {
  console.log("app running");
});
