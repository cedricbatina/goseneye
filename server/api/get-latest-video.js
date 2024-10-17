import { getConnection } from "~~/server/db.config";

export default defineEventHandler(async (event) => {
  try {
    // Récupérer la dernière vidéo publiée depuis la base de données
    const connection = await getConnection();
    console.log("Récupération de la dernière vidéo publiée");

    const [rows] = await connection.execute(
      "SELECT id, title, youtube_url, description FROM videos ORDER BY published_at DESC LIMIT 1"
    );

    await connection.end();

    if (rows.length === 0) {
      return { error: "Aucune vidéo trouvée" };
    }

    return { video: rows[0] };
  } catch (error) {
    console.error("Erreur lors de la récupération de la vidéo:", error);
    return { error: "Erreur lors de la récupération de la vidéo" };
  }
});
