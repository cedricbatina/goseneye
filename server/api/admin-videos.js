import { getConnection } from "~~/server/db.config";

export default defineEventHandler(async (event) => {
  const { user_id } = getQuery(event); // Récupère l'user_id passé en query

  if (!user_id) {
    return { error: "L'ID utilisateur est requis." };
  }

  try {
    const connection = await getConnection();

    // Récupérer le nombre total de vidéos créées par l'utilisateur
    const [totalResult] = await connection.execute(
      "SELECT COUNT(*) as totalVideos FROM videos WHERE user_id = ?",
      [user_id]
    );

    // Récupérer les 5 dernières vidéos créées par l'utilisateur
    const [recentVideosResult] = await connection.execute(
      "SELECT title, slug FROM videos WHERE user_id = ? ORDER BY created_at DESC LIMIT 5",
      [user_id]
    );

    await connection.end();

    const totalVideos = totalResult[0]?.totalVideos || 0;
    const recentVideos = recentVideosResult || [];

    return { totalVideos, recentVideos };
  } catch (error) {
    console.error("Erreur lors de la récupération des vidéos :", error);
    return { error: "Erreur lors de la récupération des vidéos." };
  }
});
