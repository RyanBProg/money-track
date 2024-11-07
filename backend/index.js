const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db.js");
const transactionRoutes = require("./routes/transactionRoutes.js");

const app = express();
const PORT = 4040;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
