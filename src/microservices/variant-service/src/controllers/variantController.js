const Variant = require('../models/Variant');

// Récupérer tous les produits
exports.getAllVariants = async (req, res) => {
    try {
        const variants = await Variant.findAll();
        res.json(variants);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des variants' });
    }
};

// Récupérer un produit par ID
exports.getVariantsById = async (req, res) => {
    const { id } = req.params;
    try {
        const variant = await Variant.findByPk(id);
        if (!variant) {
            return res.status(404).json({ error: 'Variants non trouvé' });
        }
        res.json(variant);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du variant'});
    }
};

// Créer un nouvel produit
exports.createVariant = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newVariant = await Variant.create({ name, description });
        res.status(201).json({ message: 'Variant créé', variant: newVariant });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du produit' });
    }
};

// Modifier un produit
exports.updateVariant = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const variant = await Variant.findByPk(id);
        if (!variant) {
            return res.status(404).json({ error: 'Variant non trouvé' });
        }

        variant.name = name || variant.name;
        variant.description = description || variant.description;

        await variant.save();

        res.json({ message: 'Variant mis à jour', variant });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du Variant' });
    }
};

// Supprimer un produit
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
        res.status(500).json({ error: 'Erreur lors de la suppression du Variant' });
    }
};
