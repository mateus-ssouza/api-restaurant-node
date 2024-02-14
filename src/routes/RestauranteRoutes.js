const router = require('express').Router();

const RestauranteController = require('../controllers/RestauranteController');

router.post('/create', RestauranteController.create);
router.get('/:id', RestauranteController.getById);
router.put('/:id', RestauranteController.editRestaurant);
router.delete('/:id', RestauranteController.removeRestaurant);
router.get('/', RestauranteController.getAll);

module.exports = router;