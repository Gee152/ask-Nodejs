const { Sequelize, DataTypes } = require('sequelize');
const con = require("../db/con.js");

const Answers = con.define("answers", {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  answersId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Answers.sync({ force: false }).then(() => {});
module.exports = Answers;