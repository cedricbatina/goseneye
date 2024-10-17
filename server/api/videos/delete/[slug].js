import { getConnection } from "~~/server/db.config";

export default defineEventHandler(async (event) => {
  const slug = event.context.params.slug;

  try {
    // Récupérer les détails de la vidéo à partir de la base de données
    const connection = await getConnection();
    console.log("Connexion à la base de données établie.");

    // Supprimer la vidéo de la base de données
    const [result] = await connection.execute(
      "DELETE FROM videos WHERE slug = ?",
      [slug]
    );

    await connection.end();
    console.log("Connexion à la base de données fermée.");

    // Vérifier si la suppression a réussi
    if (result.affectedRows === 1) {
      console.log("Vidéo supprimée avec succès");
      return { success: true, message: "Vidéo supprimée avec succès" };
    } else {
      console.log("Vidéo non trouvée ou déjà supprimée");
      return { success: false, error: "Vidéo non trouvée ou déjà supprimée" };
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la vidéo par slug:", error);
    return { error: "Erreur lors de la suppression de la vidéo" };
  }
});
