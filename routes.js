const express = require("express");

const route = express.Router();
const translateController = require("./controllers/Cindex");

route.post("/translate", translateController.getTranslationResponse);

module.exports = route;
