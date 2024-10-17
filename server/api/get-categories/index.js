import { getConnection } from "~~/server/db.config";

export default defineEventHandler(async (event) => {
  try {
    const connection = await getConnection();
    const [categories] = await connection.execute(
      "SELECT id, name, slug FROM categories" // Inclure slug dans la sélection
    );

    await connection.end();

    if (categories.length > 0) {
      return { categories };
    } else {
      return { error: "Aucune catégorie trouvée" };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    return { error: "Erreur lors de la récupération des catégories" };
  }
});
