const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet")
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");


app.use(cors());
dotenv.config()
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));



mongoose
  .connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

  app.use("/api/auth", authRoute);
  app.use("/api/user", userRoute);
  app.use("/api/product", productRoute);

app.listen(5000, () => console.log("Backend is running!"));