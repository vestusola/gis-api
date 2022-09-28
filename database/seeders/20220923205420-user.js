'use strict';
let bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@example.com',
      password: bcryptjs.hashSync('password')
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
