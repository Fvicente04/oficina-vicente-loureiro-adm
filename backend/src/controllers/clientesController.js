const { Cliente, Veiculo } = require('../models');

exports.list = async (req, res, next) => {
  try {
    const clientes = await Cliente.findAll({ order: [['nome', 'ASC']] });
    res.json({ success: true, data: clientes });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json({ success: true, data: cliente });
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id, {
      include: [{ model: Veiculo, as: 'veiculos' }]
    });
    if (!cliente) return res.status(404).json({ success: false, error: 'Cliente não encontrado' });
    res.json({ success: true, data: cliente });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ success: false, error: 'Cliente não encontrado' });
    await cliente.update(req.body);
    res.json({ success: true, data: cliente });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ success: false, error: 'Cliente não encontrado' });
    await cliente.destroy();
    res.json({ success: true, message: 'Cliente removido' });
  } catch (err) { next(err); }
};
