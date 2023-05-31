const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const app = express();

require("dotenv").config();

connectDB();

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE,OPTIONS"
  );

  next();
});

// Routes
app.use("/user", require("./routes/router"));




app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
