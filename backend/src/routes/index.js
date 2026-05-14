const router = require('express').Router();
const auth = require('../middleware/auth');

router.use('/auth', require('./auth'));
router.use('/clientes', auth, require('./clientes'));
router.use('/veiculos', auth, require('./veiculos'));
router.use('/os', auth, require('./os'));
router.use('/estoque', auth, require('./estoque'));
router.use('/financeiro', auth, require('./financeiro'));
router.use('/dashboard', auth, require('./dashboard'));

module.exports = router;
