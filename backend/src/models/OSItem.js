const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('OSItem', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  os_id: { type: DataTypes.UUID, allowNull: false },
  tipo: { type: DataTypes.ENUM('servico', 'peca'), allowNull: false },
  descricao: { type: DataTypes.STRING(200), allowNull: false },
  quantidade: { type: DataTypes.DECIMAL(10, 2), defaultValue: 1 },
  valor_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  valor_total: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, { tableName: 'os_itens', timestamps: false });
