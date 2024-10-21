// netlify/functions/test-connection.js
const mysql = require("mysql2/promise");

exports.handler = async function (event, context) {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST, // Adresse IP de la base de données Infomaniak
      user: process.env.DB_USER, // Utilisateur MySQL
      password: process.env.DB_PASSWORD, // Mot de passe MySQL
      database: process.env.DB_NAME, // Nom de la base de données
      port: 3306, // Port MySQL
    });

    // Test de connexion MySQL
    const [rows] = await connection.execute("SELECT 1");
    await connection.end();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Connexion réussie",
        data: rows,
      }),
    };
  } catch (error) {
    // Gestion de l'erreur
    console.error("Erreur lors de la connexion à la base de données :", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Erreur lors de la connexion",
        error: error.message,
      }),
    };
  }
};
