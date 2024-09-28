const express = require("express");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth.route");
const connectToMongoDB = require("./db/connectToMongoDB");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.listen(8000, () => {
  console.log(`Server is running on port ${port}`);
  connectToMongoDB();
});