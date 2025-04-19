'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Posts', [
      {
        userId: 1,
        content: "Emre'nin ilk gönderisi",
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        content: "Ayşe'nin ilk gönderisi",
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
