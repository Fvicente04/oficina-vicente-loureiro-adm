'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('financeiro', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      os_id: {
        type: DataTypes.UUID,
        references: { model: 'ordens_servico', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      tipo: { type: DataTypes.ENUM('receita', 'despesa'), allowNull: false },
      descricao: { type: DataTypes.STRING(200), allowNull: false },
      valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      status: { type: DataTypes.ENUM('pendente', 'pago', 'vencido'), defaultValue: 'pendente' },
      data_vencimento: { type: DataTypes.DATEONLY },
      data_pagamento: { type: DataTypes.DATEONLY },
      categoria: { type: DataTypes.STRING(50) },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('financeiro');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_financeiro_tipo"');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_financeiro_status"');
  }
};
