const { OrdemServico, Cliente, Veiculo, OSItem, Financeiro } = require('../models');
const { Op } = require('sequelize');

exports.list = async (req, res, next) => {
  try {
    const { status, cliente_id, data_inicio, data_fim } = req.query;
    const where = {};
    if (status) where.status = status;
    if (cliente_id) where.cliente_id = cliente_id;
    if (data_inicio && data_fim) where.data_entrada = { [Op.between]: [data_inicio, data_fim] };

    const ordens = await OrdemServico.findAll({
      where,
      include: [
        { model: Cliente, as: 'cliente', attributes: ['id', 'nome', 'telefone'] },
        { model: Veiculo, as: 'veiculo', attributes: ['id', 'marca', 'modelo', 'placa', 'cor'] }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: ordens });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const os = await OrdemServico.create({ ...req.body, status: 'aberta' });
    const completa = await OrdemServico.findByPk(os.id, {
      include: [
        { model: Cliente, as: 'cliente' },
        { model: Veiculo, as: 'veiculo' }
      ]
    });
    res.status(201).json({ success: true, data: completa });
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const os = await OrdemServico.findByPk(req.params.id, {
      include: [
        { model: Cliente, as: 'cliente' },
        { model: Veiculo, as: 'veiculo' },
        { model: OSItem, as: 'itens' }
      ]
    });
    if (!os) return res.status(404).json({ success: false, error: 'OS não encontrada' });
    res.json({ success: true, data: os });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const os = await OrdemServico.findByPk(req.params.id);
    if (!os) return res.status(404).json({ success: false, error: 'OS não encontrada' });
    await os.update(req.body);
    res.json({ success: true, data: os });
  } catch (err) { next(err); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const os = await OrdemServico.findByPk(req.params.id);
    if (!os) return res.status(404).json({ success: false, error: 'OS não encontrada' });

    const { status } = req.body;
    const updates = { status };
    if (status === 'concluida') updates.data_conclusao = new Date();

    await os.update(updates);

    // Gera lançamento financeiro ao concluir
    if (status === 'concluida' && Number(os.valor_total) > 0) {
      await Financeiro.create({
        os_id: os.id,
        tipo: 'receita',
        descricao: `OS #${String(os.numero).padStart(4, '0')} — ${os.descricao_problema.substring(0, 50)}`,
        valor: os.valor_total,
        status: 'pendente',
        data_vencimento: new Date(),
        categoria: 'receita-os'
      });
    }

    res.json({ success: true, data: os });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const os = await OrdemServico.findByPk(req.params.id);
    if (!os) return res.status(404).json({ success: false, error: 'OS não encontrada' });
    await os.destroy();
    res.json({ success: true, message: 'OS removida' });
  } catch (err) { next(err); }
};
