const router = require('express').Router();

const RestauranteController = require('../controllers/RestauranteController');

// middlewares
const { imageUpload } = require('../helpers/image-upload');
const { resolver } = require('../helpers/route-adpater-error');

router.post('/', imageUpload.single('foto'), resolver(RestauranteController.createRestaurant));
router.get('/:id', resolver(RestauranteController.getRestaurantById));
router.put('/:id', imageUpload.single('foto'), resolver(RestauranteController.editRestaurant));
router.delete('/:id', resolver(RestauranteController.removeRestaurant));
router.post('/:id/produtos', imageUpload.single('foto'), resolver(RestauranteController.createProduct));
router.get('/:id/produtos', resolver(RestauranteController.getAllProductsOfRestaurant));
router.put('/:id/produtos/:idProduto', imageUpload.single('foto'), resolver(RestauranteController.editProduct));
router.delete('/:id/produtos/:idProduto', resolver(RestauranteController.removeProduct));
router.post('/:id/produtos/:idProduto/promocao', resolver(RestauranteController.addPromotion));
router.delete('/:id/produtos/:idProduto/promocao', resolver(RestauranteController.removePromotion));
router.get('/', resolver(RestauranteController.getAllRestaurant));

module.exports = router;