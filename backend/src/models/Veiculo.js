const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('Veiculo', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  cliente_id: { type: DataTypes.UUID, allowNull: false },
  marca: { type: DataTypes.STRING(50), allowNull: false },
  modelo: { type: DataTypes.STRING(50), allowNull: false },
  ano: { type: DataTypes.INTEGER },
  placa: { type: DataTypes.STRING(10), unique: true },
  cor: { type: DataTypes.STRING(30) },
  observacoes: { type: DataTypes.TEXT }
}, { tableName: 'veiculos' });
