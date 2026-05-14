const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('Cliente', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  telefone: { type: DataTypes.STRING(20), allowNull: false },
  email: { type: DataTypes.STRING(100) },
  cpf_cnpj: { type: DataTypes.STRING(20) },
  endereco: { type: DataTypes.TEXT }
}, { tableName: 'clientes' });
