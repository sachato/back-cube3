require('dotenv').config();
const express = require('express');
const sequelize = require('./src/config/database'); 
const User = require('./src/models/Variant'); 

const app = express();
const PORT = process.env.PORT || 3003;


sequelize.sync().then(() => {
    console.log('Base de données SQLite synchronisée');
}).catch((error) => {
    console.error('Erreur lors de la synchronisation de la base de données:', error);
});

app.use(express.json());

const variantRoutes = require('./src/routes/variantRoutes');
app.use('/', variantRoutes);

app.listen(PORT, () => {
    console.log(`Service de gestion des variant sur http://localhost:${PORT}`);
});
