'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Comment.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
    }
  }

  Comment.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      postId: { type: DataTypes.INTEGER, allowNull: false },
      text: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Comment',
      timestamps: true,
    }
  );

  return Comment;
};
