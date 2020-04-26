'use strict';
module.exports = (sequelize, DataTypes) => {
  const reward_events = sequelize.define('reward_events', {
    name: DataTypes.STRING
  }, {});
  reward_events.associate = function(models) {
    // associations can be defined here
    reward_events.belongsTo(models.rewards)
  };
  return reward_events;
};