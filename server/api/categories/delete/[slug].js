import { getConnection } from "~~/server/db.config";

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params;

  try {
    const connection = await getConnection();

    // Requête pour supprimer la catégorie via son slug
    const [result] = await connection.execute(
      "DELETE FROM categories WHERE slug = ?",
      [slug]
    );

    // Vérification si la suppression a bien eu lieu
    if (result.affectedRows === 0) {
      return { error: "Catégorie non trouvée ou déjà supprimée." };
    }

    return { success: true, message: "Catégorie supprimée avec succès." };
  } catch (error) {
    console.error("Erreur lors de la suppression de la catégorie:", error);
    return { error: "Erreur lors de la suppression de la catégorie." };
  }
});
