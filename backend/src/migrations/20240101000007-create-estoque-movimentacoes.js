'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('estoque_movimentacoes', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      estoque_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'estoque', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      os_id: {
        type: DataTypes.UUID,
        references: { model: 'ordens_servico', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      tipo: { type: DataTypes.ENUM('entrada', 'saida'), allowNull: false },
      quantidade: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      motivo: { type: DataTypes.STRING(200) },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('estoque_movimentacoes');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_estoque_movimentacoes_tipo"');
  }
};
