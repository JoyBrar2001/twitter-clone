const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const connectToMongoDB = require("./db/connectToMongoDB");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectToMongoDB();
});