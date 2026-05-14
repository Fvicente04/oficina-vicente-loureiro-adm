const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('Financeiro', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  os_id: { type: DataTypes.UUID },
  tipo: { type: DataTypes.ENUM('receita', 'despesa'), allowNull: false },
  descricao: { type: DataTypes.STRING(200), allowNull: false },
  valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: { type: DataTypes.ENUM('pendente', 'pago', 'vencido'), defaultValue: 'pendente' },
  data_vencimento: { type: DataTypes.DATEONLY },
  data_pagamento: { type: DataTypes.DATEONLY },
  categoria: { type: DataTypes.STRING(50) }
}, { tableName: 'financeiro' });
