const db = require('../database');
const Sequelize = require('sequelize');

const Category = db.define('categories', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Category;
