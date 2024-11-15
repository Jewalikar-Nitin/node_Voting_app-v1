const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;

db.on("connected", () => {
    console.log("connected");
});

module.exports = db;
