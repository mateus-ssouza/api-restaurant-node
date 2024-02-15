const router = require('express').Router();

const RestauranteController = require('../controllers/RestauranteController');

router.post('/', RestauranteController.createRestaurant);
router.get('/:id', RestauranteController.getRestaurantById);
router.put('/:id', RestauranteController.editRestaurant);
router.delete('/:id', RestauranteController.removeRestaurant);
router.post('/:id/produtos', RestauranteController.createProduct);
router.get('/:id/produtos', RestauranteController.getAllProductsOfRestaurant);
router.put('/:id/produtos/:idProduto', RestauranteController.editProduct);
router.delete('/:id/produtos/:idProduto', RestauranteController.removeProduct);
router.get('/', RestauranteController.getAllRestaurant);

module.exports = router;