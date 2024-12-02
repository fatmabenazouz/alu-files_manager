'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('file_manager_app', 'app_user', 'secure_password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to MySQL has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = { sequelize };
