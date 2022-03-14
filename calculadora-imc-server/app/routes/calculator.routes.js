module.exports = app => {
    const calculators = require("../controllers/calculator.controller.js");
    var router = require("express").Router();
    // Create a new Calculator
    router.post("/", calculators.create);
    // Retrieve all Calculators
    router.get("/", calculators.findAll);
    app.use('/api/calculators', router);
  };