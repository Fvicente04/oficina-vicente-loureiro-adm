const router = require('express').Router();
const ctrl = require('../controllers/dashboardController');

router.get('/kpis', ctrl.kpis);
router.get('/faturamento-mensal', ctrl.faturamentoMensal);
router.get('/os-recentes', ctrl.osRecentes);
router.get('/estoque-critico', ctrl.estoqueCritico);

module.exports = router;
