'use strict';
module.exports = (sequelize, DataTypes) => {
  const rewards = sequelize.define('rewards', {
    name: DataTypes.STRING,
    amount: DataTypes.STRING,
    message: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    reward_id: DataTypes.INTEGER
  }, {});
  rewards.associate = function(models) {
    // associations can be defined here
    rewards.hasOne(models.reward_events,{
      foreignKey: {
        name: 'reward_type',
        allowNull: false
      }
    })
  };
  return rewards;
};