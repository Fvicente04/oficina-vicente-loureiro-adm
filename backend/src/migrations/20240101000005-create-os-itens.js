'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('os_itens', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      os_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'ordens_servico', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tipo: { type: DataTypes.ENUM('servico', 'peca'), allowNull: false },
      descricao: { type: DataTypes.STRING(200), allowNull: false },
      quantidade: { type: DataTypes.DECIMAL(10, 2), defaultValue: 1 },
      valor_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      valor_total: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('os_itens');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_os_itens_tipo"');
  }
};
