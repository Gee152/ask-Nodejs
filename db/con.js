const Sequelize = require("sequelize");

const con = new Sequelize('perguntas', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = con;