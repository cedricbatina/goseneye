import { getConnection } from "~~/server/db.config";

export default defineEventHandler(async (event) => {
  const slug = event.context.params.slug;

  try {
    // Récupérer les détails de la vidéo à partir de la base de données
    const connection = await getConnection();
    console.log("Connexion à la base de données établie.");

    // Requête SQL préparée sécurisée
    const [video] = await connection.execute(
      `SELECT videos.*, categories.name AS category_name 
   FROM videos
   LEFT JOIN categories ON videos.category_id = categories.id
   WHERE videos.slug = ?`,
      [slug]
    );

    await connection.end();
    console.log("Connexion à la base de données fermée.");

    // Vérifie si la vidéo existe
    if (video.length > 0) {
      console.log(`Vidéo trouvée : ${video[0].title}`);
      return { video: video[0] };
    } else {
      console.log("Vidéo non trouvée.");
      return { error: "Vidéo non trouvée" };
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de la vidéo par slug:",
      error
    );
    return { error: "Erreur lors de la récupération des détails de la vidéo" };
  }
});
