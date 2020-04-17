'use strict';
module.exports = (sequelize, DataTypes) => {
  const family_relations = sequelize.define('family_relations', {
    name: DataTypes.STRING
  }, {});
  family_relations.associate = function(models) {
    // associations can be defined here
  };
  return family_relations;
};