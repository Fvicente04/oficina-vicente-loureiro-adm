'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('veiculos', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      cliente_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'clientes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      marca: { type: DataTypes.STRING(50), allowNull: false },
      modelo: { type: DataTypes.STRING(50), allowNull: false },
      ano: { type: DataTypes.INTEGER },
      placa: { type: DataTypes.STRING(10), unique: true },
      cor: { type: DataTypes.STRING(30) },
      observacoes: { type: DataTypes.TEXT },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('veiculos');
  }
};
