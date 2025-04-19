'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        
        username: 'emre',
        email: 'emre@example.com',
        password: await bcrypt.hash('123456', 10),
        profilePicture: null,
        bio: 'Merhaba ben Emre',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'emine',
        email: 'emine@example.com',
        password: await bcrypt.hash('123456', 10),
        profilePicture: null,
        bio: 'Merhaba ben Emo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
