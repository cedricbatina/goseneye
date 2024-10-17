import { getConnection } from "~~/server/db.config";

export default defineEventHandler(async (event) => {
  try {
    // Récupérer l'id de l'utilisateur depuis les paramètres de l'URL
    const userId = event.context.params.userId;

    // Vérifier que l'id de l'utilisateur est fourni
    if (!userId) {
      return { error: "L'ID de l'utilisateur est requis." };
    }

    // Connexion à la base de données
    const connection = await getConnection();

    // Supprimer l'utilisateur de la base de données
    const [result] = await connection.execute(
      `DELETE FROM users WHERE id = ?`,
      [userId]
    );

    // Fermer la connexion
    await connection.end();

    // Vérifier si la suppression a bien eu lieu
    if (result.affectedRows === 0) {
      return { error: "Aucun utilisateur trouvé avec cet ID." };
    }

    // Renvoyer un message de succès
    return { message: "Utilisateur supprimé avec succès" };
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    return { error: "Erreur lors de la suppression de l'utilisateur" };
  }
});
