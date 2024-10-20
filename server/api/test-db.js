import { createConnection } from "mysql2/promise";

export default defineEventHandler(async (event) => {
  try {
    const connection = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Exécuter une requête simple pour tester la connexion
    const [rows] = await connection.execute("SELECT 1");
    return { success: true, message: "Connexion réussie", data: rows };
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données:", error);
    return {
      success: false,
      message: "Erreur lors de la connexion à la base de données",
      error,
    };
  }
});
