require('dotenv').config();
const express = require('express');
const sequelize = require('./src/config/database'); 
const User = require('./src/models/Product'); 

const app = express();
const PORT = process.env.PORT || 3002;

// Synchronisation de la base de données
sequelize.sync().then(() => {
    console.log('Base de données SQLite synchronisée');
}).catch((error) => {
    console.error('Erreur lors de la synchronisation de la base de données:', error);
});

app.use(express.json());

const productRoutes = require('./src/routes/productRoutes');
const variantRoutes = require('./src/routes/variantRoutes');
const categorieRoutes = require('./src/routes/categorieRoute');

app.use('/categories', categorieRoutes);
app.use('/variants', variantRoutes);
app.use('/products', productRoutes);


app.listen(PORT, () => {
    console.log(`Service de gestion des produit sur http://localhost:${PORT}`);
});
