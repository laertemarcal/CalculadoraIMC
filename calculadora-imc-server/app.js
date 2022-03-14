const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:3000"
};
const db = require("./app/models");

//middlewares
app.use(cors(corsOptions));
app.use(express.json());

require("./app/routes/calculator.routes")(app);

//db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

app.get('/', (req, res) => {
    res.json({ message: "Calculadora IMC API" });
});

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}.`);
});