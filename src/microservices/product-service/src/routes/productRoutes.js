const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Récupérer tous les utilisateurs
router.get('/', productController.getAllProducts);

// Récupérer un utilisateur par ID
router.get('/:id', productController.getProductsById);

// Créer un nouvel utilisateur
router.post('/', productController.createProduct);

// Modifier un utilisateur
router.put('/:id', productController.updateProduct);

// Supprimer un utilisateur
router.delete('/:id', productController.deleteProduct);

router.get('/productsbycategory/:id', productController.getProductsByCategory);

router.get('/getallvariantbyproductid/:id', productController.getVariantsByProduct);



module.exports = router;