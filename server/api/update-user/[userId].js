import { getConnection } from "~~/server/db.config"; // Importer ta configuration DB

export default defineEventHandler(async (event) => {
  const userId = event.context.params.userId; // Récupérer l'userId depuis les paramètres d'URL
  const body = await readBody(event); // Lire les données du corps de la requête

  try {
    const connection = await getConnection();

    // Mettre à jour les informations de l'utilisateur dans la base de données
    const [result] = await connection.execute(
      `
      UPDATE users SET username = ?, email = ?, role_id = ? WHERE id = ?
      `,
      [body.username, body.email, body.role_id, userId]
    );

    // Vérifier que l'utilisateur a bien été mis à jour
    if (result.affectedRows === 0) {
      return { error: "Aucun utilisateur trouvé" };
    }

    await connection.end();

    return { message: "Utilisateur mis à jour avec succès" };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    return { error: "Erreur lors de la mise à jour de l'utilisateur" };
  }
});
