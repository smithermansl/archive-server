const db = require('../database');
const Sequelize = require('sequelize');

const Guest = db.define('guests', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  }
});

module.exports = Guest;
