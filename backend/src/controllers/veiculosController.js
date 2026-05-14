const { Veiculo, Cliente } = require('../models');

exports.list = async (req, res, next) => {
  try {
    const veiculos = await Veiculo.findAll({
      include: [{ model: Cliente, as: 'cliente', attributes: ['id', 'nome', 'telefone'] }],
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: veiculos });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const veiculo = await Veiculo.create(req.body);
    res.status(201).json({ success: true, data: veiculo });
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const veiculo = await Veiculo.findByPk(req.params.id, {
      include: [{ model: Cliente, as: 'cliente' }]
    });
    if (!veiculo) return res.status(404).json({ success: false, error: 'Veículo não encontrado' });
    res.json({ success: true, data: veiculo });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const veiculo = await Veiculo.findByPk(req.params.id);
    if (!veiculo) return res.status(404).json({ success: false, error: 'Veículo não encontrado' });
    await veiculo.update(req.body);
    res.json({ success: true, data: veiculo });
  } catch (err) { next(err); }
};
