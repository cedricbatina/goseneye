import { getConnection } from "~~/server/db.config";

export default defineEventHandler(async (event) => {
  try {
    // Récupérer les données de la base de données
    const connection = await getConnection();

    const [videos] = await connection.execute(`
      SELECT 
        videos.id, 
        videos.title, 
        videos.description, 
        videos.youtube_url, 
        videos.thumbnail_url, 
        videos.published_at, 
        videos.created_at,
        videos.slug,
        videos.duration,
        categories.name AS category_name
      FROM videos
      LEFT JOIN categories ON videos.category_id = categories.id
      ORDER BY videos.published_at DESC
    `);

    // Fermer la connexion à la base de données
    await connection.end();

    // Retourner les vidéos
    return {
      videos,
    };
  } catch (error) {
    console.error("Error fetching videos from the database: ", error.message);
    return { error: "Erreur lors de la récupération des vidéos" };
  }
});
