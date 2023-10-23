// Import the Sequelize constructor from sequelize
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a new connection instance, using option 3 from the docs
const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: '127.0.0.1',
    dialect: 'mysql',
    // This is for the log in the terminal
    logging: false,
  }
);

// Export the connection object
module.exports = connection;