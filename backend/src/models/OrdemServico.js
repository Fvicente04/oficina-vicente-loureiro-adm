const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('OrdemServico', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  numero: { type: DataTypes.INTEGER, autoIncrement: true, unique: true },
  veiculo_id: { type: DataTypes.UUID, allowNull: false },
  cliente_id: { type: DataTypes.UUID, allowNull: false },
  descricao_problema: { type: DataTypes.TEXT, allowNull: false },
  status: {
    type: DataTypes.ENUM('aberta', 'em_andamento', 'aguardando_peca', 'concluida', 'cancelada'),
    defaultValue: 'aberta'
  },
  data_entrada: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
  data_previsao: { type: DataTypes.DATEONLY },
  data_conclusao: { type: DataTypes.DATEONLY },
  valor_total: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  observacoes: { type: DataTypes.TEXT }
}, { tableName: 'ordens_servico' });
