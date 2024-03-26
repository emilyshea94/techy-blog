const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  // Your database configuration options
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'sage123',
  database: 'techy_blog'
});

module.exports = sequelize;
