'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
      Comment.belongsTo(models.Post, { foreignKey: 'postId' });
    }
  }

  Comment.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });

  return Comment;
};
