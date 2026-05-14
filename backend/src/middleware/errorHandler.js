module.exports = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      success: false,
      error: err.errors.map(e => e.message).join(', ')
    });
  }

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Erro interno do servidor'
  });
};
