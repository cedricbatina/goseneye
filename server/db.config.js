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
  };

  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connected to the database successfully!"); // Log si la connexion réussit
    return connection;
  } catch (error) {
    console.error("Failed to connect to the database:", error); // Log si la connexion échoue
    throw error; // Relancer l'erreur pour la gestion des exceptions
  }
}
*/
import mysql from "mysql2/promise";
import { useRuntimeConfig } from "#imports"; // Import pour accéder à runtimeConfig

// Fonction pour obtenir une connexion à la base de données
export async function getConnection() {
  const config = useRuntimeConfig(); // Récupérer les configurations depuis nuxt.config.ts

  // Configurer les paramètres de la base de données
  const dbConfig = {
    socketPath: config.dbHost, // Utiliser le socket Unix
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };

  // Si on est en production, utiliser socketPath pour Google Cloud SQL
  if (process.env.NODE_ENV === "production") {
    dbConfig.socketPath = `/cloudsql/${config.dbHost}`; // Utiliser le socket Unix pour Cloud SQL
  } else {
    dbConfig.host = config.dbHost; // Utiliser `host` pour le développement local
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
