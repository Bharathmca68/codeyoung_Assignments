require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const DBconnection = require("./config/DBconnections");

const app = express();

app.use(cors());

app.use(bodyParser.json());

DBconnection.sync();

app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log("listening on port ---- ", process.env.PORT);
});
