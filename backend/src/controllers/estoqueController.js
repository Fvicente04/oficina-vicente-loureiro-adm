const { Estoque, EstoqueMovimentacao } = require('../models');
const { Op } = require('sequelize');

exports.list = async (req, res, next) => {
  try {
    const estoque = await Estoque.findAll({ order: [['nome', 'ASC']] });
    res.json({ success: true, data: estoque });
  } catch (err) { next(err); }
};

exports.critico = async (req, res, next) => {
  try {
    const itens = await Estoque.findAll({
      where: { quantidade_atual: { [Op.lt]: sequelize.col('quantidade_minima') } },
      order: [['nome', 'ASC']]
    });
    // fallback: busca todos e filtra em JS (mais compatível)
    const todos = await Estoque.findAll();
    const criticos = todos
      .filter(i => Number(i.quantidade_atual) < Number(i.quantidade_minima))
      .map(i => ({
        ...i.toJSON(),
        percentual: Number(i.quantidade_minima) > 0
          ? Math.round((Number(i.quantidade_atual) / Number(i.quantidade_minima)) * 100)
          : 0
      }));
    res.json({ success: true, data: criticos });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const item = await Estoque.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const item = await Estoque.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Item não encontrado' });
    await item.update(req.body);
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
};

exports.movimentacao = async (req, res, next) => {
  try {
    const item = await Estoque.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Item não encontrado' });

    const { tipo, quantidade, motivo, os_id } = req.body;
    const qtd = Number(quantidade);

    if (tipo === 'saida' && Number(item.quantidade_atual) < qtd)
      return res.status(400).json({ success: false, error: 'Estoque insuficiente' });

    const delta = tipo === 'entrada' ? qtd : -qtd;
    await item.update({ quantidade_atual: Number(item.quantidade_atual) + delta });
    await EstoqueMovimentacao.create({ estoque_id: item.id, tipo, quantidade: qtd, motivo, os_id });

    res.json({ success: true, data: item });
  } catch (err) { next(err); }
};
