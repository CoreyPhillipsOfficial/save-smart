const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

const dayjs = require('dayjs');

class Goal extends Model { }

Goal.init({
  goalName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  goalAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currentAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Define the virtual column for balance
  balance: {
    type: DataTypes.VIRTUAL,
    get() {
      // Calculate the balance as the difference between goalAmount and currentAmount
      return this.getDataValue('goalAmount') - this.getDataValue('currentAmount');
    },
  },
  date: {
    type: DataTypes.VIRTUAL,
    get() {
      return dayjs(this.createdAt).format('MM/DD/YYYY');
    },
  },
}, {
  modelName: 'goal',
  sequelize: db,
});

module.exports = Goal;
