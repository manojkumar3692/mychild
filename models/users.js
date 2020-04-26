'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    family_relation_id: DataTypes.INTEGER,
    mobile_number: DataTypes.STRING,
    image_url: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.rewards,{
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })
    users.hasMany(models.profile_images,{
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })
  };
  return users;
};