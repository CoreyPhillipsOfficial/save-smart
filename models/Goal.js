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
  date: {
    type: DataTypes.VIRTUAL,
    get() {
      return dayjs(this.createdAt).format('MM/DD/YYYY')
    }
  }
}, {
  modelName: 'goal',
  sequelize: db
});


module.exports = Goal;