const router = require('express').Router();

const RestauranteController = require('../controllers/RestauranteController');

// middlewares
const { imageUpload } = require('../helpers/image-upload');

router.post('/', imageUpload.single('foto'), RestauranteController.createRestaurant);
router.get('/:id', RestauranteController.getRestaurantById);
router.put('/:id', imageUpload.single('foto'), RestauranteController.editRestaurant);
router.delete('/:id', RestauranteController.removeRestaurant);
router.post('/:id/produtos', imageUpload.single('foto'), RestauranteController.createProduct);
router.get('/:id/produtos', RestauranteController.getAllProductsOfRestaurant);
router.put('/:id/produtos/:idProduto', imageUpload.single('foto'), RestauranteController.editProduct);
router.delete('/:id/produtos/:idProduto', RestauranteController.removeProduct);
router.post('/:id/produtos/:idProduto/promocao', RestauranteController.addPromotion);
router.delete('/:id/produtos/:idProduto/promocao', RestauranteController.removePromotion);
router.get('/', RestauranteController.getAllRestaurant);

module.exports = router;