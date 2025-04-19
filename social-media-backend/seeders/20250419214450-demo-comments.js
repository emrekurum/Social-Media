'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [
      {
        userId: 1,
        postId: 1,
        text: 'Bu çok güzel bir gönderi!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        postId: 1,
        text: 'Katılıyorum!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
