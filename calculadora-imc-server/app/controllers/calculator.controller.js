const db = require("../models");
const Calculator = db.calculators;
const Op = db.Sequelize.Op;

// Salva novo resultado
exports.create = (req, res) => {
    console.log(req.body);
    // Valida o POST request
    if (!req.body.result) {
        res.status(400).send({
            message: "Resultado não pode ser vazio"
        });
        return;
    }
    // Cria resultado
    const result = {
        result: req.body.result
    };
    // Salva no banco
    Calculator.create(result)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erro ao salvar o resultado."
            });
        });
};

//Encontra os resultados
exports.findAll = (req, res) => {
    Calculator.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erro ao buscar os resultados."
            });
        });
};