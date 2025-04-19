'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.belongsTo(models.User, { foreignKey: 'userId' });
      Like.belongsTo(models.Post, { foreignKey: 'postId' });
    }
  }

  Like.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Like',
  });

  return Like;
};
