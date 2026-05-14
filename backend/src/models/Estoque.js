const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('Estoque', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  categoria: { type: DataTypes.STRING(50) },
  unidade: { type: DataTypes.STRING(20) },
  quantidade_atual: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  quantidade_minima: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  valor_unitario: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  fornecedor: { type: DataTypes.STRING(100) }
}, { tableName: 'estoque' });
