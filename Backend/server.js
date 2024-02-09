const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
const DBConnection = require('./src/config/mySqlDB.js');
const routes = require("./src/routes/index.js");

const app = express();
const port = process.env.PORT

app.use(cors());
app.use(bodyParser.json());

DBConnection;

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});