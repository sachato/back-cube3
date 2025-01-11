import createExpressServer from "./server";
const sequelize = require('./microservices/product-service/src/config/database'); // Votre fichier de configuration Sequelize
const { Product, Categories, ProductsCategories } = require('./microservices/product-service/src/models'); // Importez vos modèles


const app = createExpressServer();
const port = process.env.PORT || 3000;

sequelize.sync({ alter: true }) // `alter: true` met à jour les tables sans les recréer (évite la perte de données)
    .then(() => {
        console.log('Base de données synchronisée');
        // Démarrer le serveur une fois la base synchronisée
        app.listen(port, () => {
            console.log(`Serveur démarré sur http://localhost:${port}`);
        });
    })
    .catch((err: any) => {
        console.error('Erreur lors de la synchronisation de la base de données :', err);
    });

