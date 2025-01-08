const Product = require('../models/Product');
const Categories = require('../models/Categorie');
const ProductsCategories = require('../models/ProductsCategories');
const Variant = require('../models/Variant');

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

exports.getProductsByCategory = async (req, res) => {
    const { id } = req.params; // L'ID de la catégorie à récupérer
    try {
        const category = await Categories.findByPk(id, {
            include: {
                model: ProductsCategories,
                as: 'categoryProducts', // Alias défini dans `models/index.js`
                include: {
                    model: Product,
                    as: 'product', // Alias défini dans ProductsCategories
                    attributes: ['id', 'name', 'description'], // Limitez les colonnes retournées
                },
            },
        });

        if (!category) {
            return res.status(404).json({ error: 'Catégorie non trouvée' });
        }

        // Extraire les produits associés
        const products = category.categoryProducts.map((relation) => relation.product);

        res.json({
            category: {
                id: category.id,
                name: category.name,
            },
            products,
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des produits par catégorie :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des produits par catégorie' });
    }
};

exports.getVariantsByProduct = async (req, res) => {
    const { id } = req.params; // ID du produit
    try {
        const product = await Product.findByPk(id, {
            include: {
                model: Variant, // Associez le modèle Variant
                as: 'variants', // Alias défini dans `models/index.js`
                attributes: ['id', 'name', 'price', 'stock'], // Limitez les colonnes retournées
            },
        });

        if (!product) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        // Renvoyer les variants associés
        res.json({
            product: {
                id: product.id,
                name: product.name,
                description: product.description,
            },
            variants: product.variants, // Les variants associés au produit
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des variants par produit :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des variants' });
    }
};
