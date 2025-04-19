'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Likes', [
      {
        userId: 1,
        postId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        postId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Likes', null, {});
  }
};
