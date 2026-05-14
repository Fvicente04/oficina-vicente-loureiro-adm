const router = require('express').Router();
const ctrl = require('../controllers/estoqueController');

router.get('/', ctrl.list);
router.get('/critico', ctrl.critico);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.post('/:id/movimentacao', ctrl.movimentacao);

module.exports = router;
