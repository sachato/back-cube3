const axios = require('axios');
const Variant = require('../models/Variant');

exports.getAllVariants = async (req, res) => {
    try {
        // Récupérer toutes les variantes depuis la base de données locale
        const variants = await Variant.findAll();
        console.log('Variants récupérés :', variants);

        // Récupérer tous les produits depuis le service Product
        const productResponse = await axios.get('http://localhost:3000/products');
        const products = productResponse.data;
        console.log('Produit récupérés :', products);

        // Associer les produits aux variantes
        const variantsWithProducts = variants.map(variant => {
            const product = products.find(prod => prod.id === parseInt(variant.id_product, 10));
            return {
                ...variant.toJSON(),
                product: product || null, 
            };
        });

        res.json(variantsWithProducts);
    } catch (error) {
        console.error('Erreur lors de la récupération des variants:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des variants' });
    }
};

// Récupérer un produit par ID
exports.getVariantsById = async (req, res) => {
    const { id } = req.params;
    try {
        // Récupérer la variante par ID
        const variant = await Variant.findByPk(id);
        if (!variant) {
            return res.status(404).json({ error: 'Variant non trouvé' });
        }

        // Récupérer le produit associé depuis le service Product
        const productResponse = await axios.get(`http://localhost:3000/products/${variant.id_product}`);
        const product = productResponse.data;

        // Ajouter le produit à la réponse de la variante
        const variantWithProduct = {
            ...variant.toJSON(),
            product: product || null,
        };

        res.json(variantWithProduct);
    } catch (error) {
        console.error('Erreur lors de la récupération du variant:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération du variant' });
    }
};

// Créer un nouveau variant
exports.createVariant = async (req, res) => {
    const { id_product, size, color, price, stock, name } = req.body;
    try {
        const newVariant = await Variant.create({ id_product, size, color, price, stock, name });
        res.status(201).json({ message: 'Variant créé', variant: newVariant });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du variant' });
    }
};


// Modifier une variante
exports.updateVariant = async (req, res) => {
    const { id } = req.params;
    const { name, size, color, price, stock, id_product } = req.body;
    try {
        const variant = await Variant.findByPk(id);
        if (!variant) {
            return res.status(404).json({ error: 'Variant non trouvé' });
        }

        // Mise à jour des champs
        variant.name = name || variant.name;
        variant.size = size || variant.size;
        variant.color = color || variant.color;
        variant.price = price || variant.price;
        variant.stock = stock || variant.stock;
        variant.id_product = id_product || variant.id_product;

        await variant.save();

        res.json({ message: 'Variant mis à jour', variant });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du variant:', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du variant' });
    }
};

// Supprimer une variante
exports.deleteVariant = async (req, res) => {
    const { id } = req.params;
    try {
        const variant = await Variant.findByPk(id);
        if (!variant) {
            return res.status(404).json({ error: 'Variant non trouvé' });
        }

        await variant.destroy();

        res.json({ message: 'Variant supprimé' });
    } catch (error) {
        console.error('Erreur lors de la suppression du variant:', error);
        res.status(500).json({ error: 'Erreur lors de la suppression du variant' });
    }
};
