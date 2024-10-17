import { getConnection } from "~~/server/db.config";

export default defineEventHandler(async (event) => {
  try {
    const connection = await getConnection();

    // Récupérer toutes les vidéos
    const [videos] = await connection.execute(`
      SELECT id, title, description, youtube_url, thumbnail_url, published_at
      FROM videos
      ORDER BY published_at DESC
    `);

    await connection.end();

    if (!videos || videos.length === 0) {
      throw new Error("Aucune vidéo trouvée");
    }

    return {
      videos,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des vidéos depuis la base de données:",
      error
    );
    return { error: "Erreur lors de la récupération des vidéos" };
  }
});
