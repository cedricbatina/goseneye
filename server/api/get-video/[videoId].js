import { getConnection } from "~~/server/db.config";

export default defineEventHandler(async (event) => {
  const videoId = event.context.params.videoId;

  // Validation du paramètre pour s'assurer qu'il s'agit d'un entier valide
  if (isNaN(videoId) || videoId <= 0) {
    return { error: "ID de vidéo invalide" };
  }

  try {
    const connection = await getConnection();

    // Requête SQL préparée sécurisée
    const [video] = await connection.execute(
      "SELECT * FROM videos WHERE id = ?",
      [videoId]
    );

    await connection.end();

    // Vérifie si la vidéo existe
    if (video.length > 0) {
      return { video: video[0] };
    } else {
      return { error: "Vidéo non trouvée" };
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de la vidéo:",
      error
    );
    return { error: "Erreur lors de la récupération des détails de la vidéo" };
  }
});
