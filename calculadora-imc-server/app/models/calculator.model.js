module.exports = (sequelize, Sequelize) => {
    const Calculator = sequelize.define("calculator", {
        result: {
            type: Sequelize.DECIMAL
        }
    });
    return Calculator;
};