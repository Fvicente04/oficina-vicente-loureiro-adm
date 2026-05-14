const { Financeiro, OrdemServico } = require('../models');
const { Op, fn, col, literal } = require('sequelize');

exports.list = async (req, res, next) => {
  try {
    const { tipo, status, mes, ano } = req.query;
    const where = {};
    if (tipo) where.tipo = tipo;
    if (status) where.status = status;
    if (mes && ano) {
      where.data_vencimento = {
        [Op.between]: [`${ano}-${mes}-01`, `${ano}-${mes}-31`]
      };
    }
    const lancamentos = await Financeiro.findAll({
      where,
      include: [{ model: OrdemServico, as: 'ordem', attributes: ['id', 'numero'], required: false }],
      order: [['data_vencimento', 'DESC']]
    });
    res.json({ success: true, data: lancamentos });
  } catch (err) { next(err); }
};

exports.resumo = async (req, res, next) => {
  try {
    const now = new Date();
    const inicio = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
    const fim = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-31`;

    const [receitas, despesas, aReceber] = await Promise.all([
      Financeiro.sum('valor', { where: { tipo: 'receita', status: 'pago', data_pagamento: { [Op.between]: [inicio, fim] } } }),
      Financeiro.sum('valor', { where: { tipo: 'despesa', status: 'pago', data_pagamento: { [Op.between]: [inicio, fim] } } }),
      Financeiro.sum('valor', { where: { tipo: 'receita', status: 'pendente' } })
    ]);

    res.json({
      success: true,
      data: {
        receitas: Number(receitas) || 0,
        despesas: Number(despesas) || 0,
        saldo: (Number(receitas) || 0) - (Number(despesas) || 0),
        aReceber: Number(aReceber) || 0
      }
    });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const lancamento = await Financeiro.create(req.body);
    res.status(201).json({ success: true, data: lancamento });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const lancamento = await Financeiro.findByPk(req.params.id);
    if (!lancamento) return res.status(404).json({ success: false, error: 'Lançamento não encontrado' });
    await lancamento.update(req.body);
    res.json({ success: true, data: lancamento });
  } catch (err) { next(err); }
};
