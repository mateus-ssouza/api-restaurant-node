const router = require('express').Router();

const RestauranteController = require('../controllers/RestauranteController');

router.post('/create', RestauranteController.create);
router.get('/', RestauranteController.getAll);

module.exports = router;