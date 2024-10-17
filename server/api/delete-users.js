import { getConnection } from "~~/server/db.config";

export default defineEventHandler(async (event) => {
  const userId = event.context.params.userId; // Récupérer l'id de l'utilisateur depuis l'URL
  const connection = await getConnection();

  // Supprimer l'utilisateur de la base de données
  await connection.execute(`DELETE FROM users WHERE id = ?`, [userId]);

  await connection.end();

  return { message: "Utilisateur supprimé avec succès" };
});
