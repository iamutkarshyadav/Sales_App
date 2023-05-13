const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGODB_URL } = require("./config");

mongoose.connect(MONGODB_URL);

mongoose.connection.on("connected", () => {
  console.log("Database Connected");
});
mongoose.connection.on("error", (error) => {
  console.log("Some error occured while connecting to data");
});
app.use(cors());
app.use(express.json());

//requiring models
require("./models/user_model");
require("./models/sales_model");

// registering user schema
app.use(require("./routes/user_route"));
app.use(require("./routes/sales_route"));

app.listen(PORT, () => {
  console.log("Server started !");
});
