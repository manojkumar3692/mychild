'use strict';
module.exports = (sequelize, DataTypes) => {
  const gift = sequelize.define('gift', {
    name: DataTypes.STRING
  }, {});
  gift.associate = function(models) {
    // associations can be defined here
  };
  return gift;
};