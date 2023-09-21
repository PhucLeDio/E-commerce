const express = require("express");
require("dotenv").config();
const dbconnect = require("./config/dbconnect");
const initRoutes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "PUT", "DELETE", "GET"],
  })
);
app.use(cookieParser());
const port = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbconnect();

initRoutes(app);

app.listen(port, () => {
  console.log("Server running on port " + port);
});
