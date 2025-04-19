'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Post.hasMany(models.Comment, { foreignKey: 'postId' });
      Post.hasMany(models.Like, { foreignKey: 'postId' });
    }
  }

  Post.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Post',
  });

  return Post;
};
