const { Sequelize, DataTypes } = require('sequelize');
const con = require("../db/con.js");

const Quests = con.define("quests", {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Quests.sync({ force: false }).then(() => {});
module.exports = Quests;