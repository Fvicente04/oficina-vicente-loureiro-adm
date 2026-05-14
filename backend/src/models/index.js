const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

const db = { sequelize, Sequelize };

db.User = require('./User')(sequelize);
db.Cliente = require('./Cliente')(sequelize);
db.Veiculo = require('./Veiculo')(sequelize);
db.OrdemServico = require('./OrdemServico')(sequelize);
db.OSItem = require('./OSItem')(sequelize);
db.Estoque = require('./Estoque')(sequelize);
db.EstoqueMovimentacao = require('./EstoqueMovimentacao')(sequelize);
db.Financeiro = require('./Financeiro')(sequelize);

// Associations
db.Cliente.hasMany(db.Veiculo, { foreignKey: 'cliente_id', as: 'veiculos' });
db.Veiculo.belongsTo(db.Cliente, { foreignKey: 'cliente_id', as: 'cliente' });

db.Cliente.hasMany(db.OrdemServico, { foreignKey: 'cliente_id', as: 'ordens' });
db.OrdemServico.belongsTo(db.Cliente, { foreignKey: 'cliente_id', as: 'cliente' });

db.Veiculo.hasMany(db.OrdemServico, { foreignKey: 'veiculo_id', as: 'ordens' });
db.OrdemServico.belongsTo(db.Veiculo, { foreignKey: 'veiculo_id', as: 'veiculo' });

db.OrdemServico.hasMany(db.OSItem, { foreignKey: 'os_id', as: 'itens' });
db.OSItem.belongsTo(db.OrdemServico, { foreignKey: 'os_id', as: 'ordem' });

db.Estoque.hasMany(db.EstoqueMovimentacao, { foreignKey: 'estoque_id', as: 'movimentacoes' });
db.EstoqueMovimentacao.belongsTo(db.Estoque, { foreignKey: 'estoque_id', as: 'item' });

db.OrdemServico.hasMany(db.Financeiro, { foreignKey: 'os_id', as: 'lancamentos' });
db.Financeiro.belongsTo(db.OrdemServico, { foreignKey: 'os_id', as: 'ordem' });

module.exports = db;
