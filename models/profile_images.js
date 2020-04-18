'use strict';
module.exports = (sequelize, DataTypes) => {
  const profile_images = sequelize.define('profile_images', {
    user_id: DataTypes.INTEGER,
    profile_image_url: DataTypes.STRING
  }, {});
  profile_images.associate = function(models) {
    // associations can be defined here
  };
  return profile_images;
};