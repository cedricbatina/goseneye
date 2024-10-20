/*import mysql from "mysql2/promise";
import { useRuntimeConfig } from "#imports"; // Import pour accéder à runtimeConfig

// Fonction pour obtenir une connexion à la base de données
export async function getConnection() {
  const config = useRuntimeConfig(); // Récupérer les configurations depuis nuxt.config.ts

  // Configurer les paramètres de la base de données
  const dbConfig = {
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3306,
  };

  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connected to the database successfully!"); // Log si la connexion réussit
    return connection;
  } catch (error) {
    console.error("Failed to connect to the database:", error); // Log si la connexion échoue
    throw error; // Relancer l'erreur pour la gestion des exceptions
  }
}*/

import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config(); // Charger les variables d'environnement du fichier .env

// Fonction pour obtenir une connexion à la base de données
export async function getConnection() {
  // Configurer les paramètres de la base de données
  const dbConfig = {
    host: process.env.DB_HOST, // Utiliser les variables d'environnement du fichier .env
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };

  // Si on est en production, utiliser socketPath pour Google Cloud SQL
  if (process.env.NODE_ENV === "production") {
    dbConfig.socketPath = `/cloudsql/${process.env.DB_HOST}`; // Utiliser le socket Unix pour Cloud SQL
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connected to the database successfully!"); // Log si la connexion réussit
    return connection;
  } catch (error) {
    console.error("Failed to connect to the database:", error); // Log si la connexion échoue
    throw error; // Relancer l'erreur pour la gestion des exceptions
  }
}
