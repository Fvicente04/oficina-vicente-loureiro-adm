'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('clientes', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      nome: { type: DataTypes.STRING(100), allowNull: false },
      telefone: { type: DataTypes.STRING(20), allowNull: false },
      email: { type: DataTypes.STRING(100) },
      cpf_cnpj: { type: DataTypes.STRING(20) },
      endereco: { type: DataTypes.TEXT },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('clientes');
  }
};
