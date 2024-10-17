import { getConnection } from "~~/server/db.config"; // Assurez-vous que le chemin vers la config de la base de données est correct

export default defineEventHandler(async (event) => {
  try {
    // Récupérer le categoryId depuis l'URL (via params)
    const categoryId = event.context.params.categoryId;

    // Obtenir une connexion à la base de données
    const connection = await getConnection();

    // Requête SQL pour récupérer les vidéos par category_id
    const [videos] = await connection.execute(
      "SELECT * FROM videos WHERE category_id = ?",
      [categoryId]
    );

    // Fermer la connexion après utilisation
    await connection.end();

    // Vérifier et renvoyer les vidéos
    if (videos.length > 0) {
      return { videos };
    } else {
      return { error: "Aucune vidéo trouvée pour cette catégorie" };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des vidéos:", error);
    return { error: "Erreur lors de la récupération des vidéos" };
  }
});
