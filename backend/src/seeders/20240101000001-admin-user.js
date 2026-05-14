'use strict';
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    const hash = await bcrypt.hash('admin123', 10);
    await queryInterface.bulkInsert('users', [{
      id: uuidv4(),
      name: 'Administrador',
      email: 'admin@oficina.com',
      password: hash,
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { email: 'admin@oficina.com' });
  }
};
