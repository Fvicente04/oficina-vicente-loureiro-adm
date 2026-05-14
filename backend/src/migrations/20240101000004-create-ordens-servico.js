'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('ordens_servico', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      numero: { type: DataTypes.INTEGER, autoIncrement: true, unique: true },
      veiculo_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'veiculos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      cliente_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'clientes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      descricao_problema: { type: DataTypes.TEXT, allowNull: false },
      status: {
        type: DataTypes.ENUM('aberta', 'em_andamento', 'aguardando_peca', 'concluida', 'cancelada'),
        defaultValue: 'aberta'
      },
      data_entrada: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
      data_previsao: { type: DataTypes.DATEONLY },
      data_conclusao: { type: DataTypes.DATEONLY },
      valor_total: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
      observacoes: { type: DataTypes.TEXT },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('ordens_servico');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_ordens_servico_status"');
  }
};
