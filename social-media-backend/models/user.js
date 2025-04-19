'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
      User.hasMany(models.Comment, { foreignKey: 'userId' });
      User.hasMany(models.Like, { foreignKey: 'userId' });
    }
  }

  User.init({
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    profilePicture: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
