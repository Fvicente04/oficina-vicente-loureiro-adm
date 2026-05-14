const { OrdemServico, Financeiro, Veiculo, Estoque, Cliente } = require('../models');
const { Op } = require('sequelize');

const mesAtual = () => {
  const now = new Date();
  return {
    inicio: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`,
    fim: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-31`
  };
};

exports.kpis = async (req, res, next) => {
  try {
    const { inicio, fim } = mesAtual();
    const [faturamento, osAbertas, aReceber] = await Promise.all([
      Financeiro.sum('valor', { where: { tipo: 'receita', status: 'pago', data_pagamento: { [Op.between]: [inicio, fim] } } }),
      OrdemServico.count({ where: { status: { [Op.in]: ['aberta', 'em_andamento', 'aguardando_peca'] } } }),
      Financeiro.sum('valor', { where: { tipo: 'receita', status: 'pendente' } })
    ]);
    res.json({
      success: true,
      data: {
        faturamentoMes: Number(faturamento) || 0,
        osAbertas: Number(osAbertas) || 0,
        veiculosPateo: Number(osAbertas) || 0,
        aReceber: Number(aReceber) || 0
      }
    });
  } catch (err) { next(err); }
};

exports.faturamentoMensal = async (req, res, next) => {
  try {
    const meses = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const ano = d.getFullYear();
      const mes = String(d.getMonth() + 1).padStart(2, '0');
      const valor = await Financeiro.sum('valor', {
        where: { tipo: 'receita', status: 'pago', data_pagamento: { [Op.between]: [`${ano}-${mes}-01`, `${ano}-${mes}-31`] } }
      });
      meses.push({ mes: d.toLocaleString('pt-BR', { month: 'short' }).toUpperCase(), valor: Number(valor) || 0 });
    }
    res.json({ success: true, data: meses });
  } catch (err) { next(err); }
};

exports.osRecentes = async (req, res, next) => {
  try {
    const ordens = await OrdemServico.findAll({
      include: [
        { model: Cliente, as: 'cliente', attributes: ['nome'] },
        { model: Veiculo, as: 'veiculo', attributes: ['marca', 'modelo', 'placa'] }
      ],
      order: [['created_at', 'DESC']],
      limit: 5
    });
    res.json({ success: true, data: ordens });
  } catch (err) { next(err); }
};

exports.estoqueCritico = async (req, res, next) => {
  try {
    const todos = await Estoque.findAll();
    const criticos = todos
      .filter(i => Number(i.quantidade_atual) < Number(i.quantidade_minima))
      .slice(0, 5)
      .map(i => ({
        ...i.toJSON(),
        percentual: Number(i.quantidade_minima) > 0
          ? Math.round((Number(i.quantidade_atual) / Number(i.quantidade_minima)) * 100)
          : 0
      }));
    res.json({ success: true, data: criticos });
  } catch (err) { next(err); }
};
