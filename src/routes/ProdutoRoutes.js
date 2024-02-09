const router = require('express').Router();

const ProdutoController = require('../controllers/ProdutoController');

router.post('/create', ProdutoController.create);
router.get('/', ProdutoController.getAll);

module.exports = router;