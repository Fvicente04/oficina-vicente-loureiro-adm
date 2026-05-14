const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('EstoqueMovimentacao', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  estoque_id: { type: DataTypes.UUID, allowNull: false },
  os_id: { type: DataTypes.UUID },
  tipo: { type: DataTypes.ENUM('entrada', 'saida'), allowNull: false },
  quantidade: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  motivo: { type: DataTypes.STRING(200) }
}, { tableName: 'estoque_movimentacoes', updatedAt: false });
