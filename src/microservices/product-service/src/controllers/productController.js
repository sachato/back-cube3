const Product = require('../models/Product');

// Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
    }
};

// Récupérer un produit par ID
exports.getProductsById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du produit'});
    }
};

// Créer un nouvel produit
exports.createProduct = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newProduct = await Product.create({ name, description });
        res.status(201).json({ message: 'Produit créé', product: newProduct });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du produit' });
    }
};

// Modifier un produit
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        product.name = name || product.name;
        product.description = description || product.description;

        await product.save();

        res.json({ message: 'Produit mis à jour', product });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
    }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        await product.destroy();

        res.json({ message: 'Produit supprimé' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du produit' });
    }
};
