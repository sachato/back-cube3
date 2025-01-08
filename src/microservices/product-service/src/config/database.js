const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cube3_user', 'cube3', 'admin2024', {
    host: 'mysql-cube3.alwaysdata.net',
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 5, // Nombre maximum de connexions simultanées
        min: 0, // Nombre minimum de connexions simultanées
        acquire: 30000, // Temps maximum en millisecondes pour tenter d'acquérir une connexion
        idle: 10000, // Temps maximum en millisecondes qu'une connexion peut rester inactive avant d'être libérée
    },
});

module.exports = sequelize;