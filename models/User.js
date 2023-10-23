// Import Model and DataTypes from sequelize
const { Model, DataTypes } = require('sequelize');

const db = require('../config/connection');

// If we use BCRYPT, bring in package
const { hash, compare } = require('bcrypt');

// Create a User class and extend the Model class
class User extends Model { }

// Call User.init and setup a couple columns/fields - username & password as text strings
User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Username is already in use.'
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: 6,
        msg: 'Your password must be at least 6 characters long.'
      }
    }
  }
}, {
  modelName: 'user',
  // Connection object
  sequelize: db,
  hooks: {
    async beforeCreate(user) {
      user.password = await hash(user.password, 10);

      return user;
    }
  }
});

// Export the User model just because
module.exports = User;