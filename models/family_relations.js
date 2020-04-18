'use strict';
module.exports = (sequelize, DataTypes) => {
  const family_relations = sequelize.define('family_relations', {
    relation: DataTypes.STRING
  }, {});
  family_relations.associate = function(models) {
    // associations can be defined here
    family_relations.hasMany(models.users,{
      foreignKey: {
        name: 'family_relation_id',
      }
    })
  };
  return family_relations;
};