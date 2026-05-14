const router = require('express').Router();
const ctrl = require('../controllers/financeiroController');

router.get('/', ctrl.list);
router.get('/resumo', ctrl.resumo);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);

module.exports = router;
