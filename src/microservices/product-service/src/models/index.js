const sequelize = require('../config/database');
const Product = require('./Product');
const Categories = require('./Categorie');
const Variant = require('./Variant');
const ProductsCategories = require('./ProductsCategories');

Product.hasMany(Variant, {
    foreignKey: 'id_product',
    as: 'variants', // Alias pour accéder aux variants d'un produit
});

// Relation : Un variant appartient à un seul produit
Variant.belongsTo(Product, {
    foreignKey: 'id_product',
    as: 'product', // Alias pour accéder au produit d'un variant
});

// Relation entre Product et ProductsCategories
Product.hasMany(ProductsCategories, {
    foreignKey: 'id_product',
    as: 'productCategoryRelations', // Alias unique
});

// Relation entre Categories et ProductsCategories
Categories.hasMany(ProductsCategories, {
    foreignKey: 'id_categorie',
    as: 'categoryProductRelations', // Alias unique
});

// Relation de ProductsCategories vers Product
ProductsCategories.belongsTo(Product, {
    foreignKey: 'id_product',
    as: 'product', // Alias pour accéder au produit
});

// Relation de ProductsCategories vers Categories
ProductsCategories.belongsTo(Categories, {
    foreignKey: 'id_categorie',
    as: 'categorie', // Alias pour accéder à la catégorie
});

module.exports = {
    sequelize,
    Product,
    Categories,
    ProductsCategories,
    Variant,
};
