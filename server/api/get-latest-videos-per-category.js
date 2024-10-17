import { getConnection } from "~~/server/db.config"; // Assure-toi que le chemin est correct

export default defineEventHandler(async (event) => {
  try {
    const connection = await getConnection();

    // Requête SQL pour obtenir la dernière vidéo de chaque catégorie avec le nom de la catégorie
    const [videos] = await connection.execute(`
  SELECT v.*, c.name AS category_name, c.slug AS category_slug
  FROM videos v
  INNER JOIN categories c ON v.category_id = c.id
  INNER JOIN (
    SELECT category_id, MAX(published_at) AS latest_video_date
    FROM videos
    GROUP BY category_id
  ) lv ON v.category_id = lv.category_id AND v.published_at = lv.latest_video_date;
`);

    await connection.end();

    // Retourne les vidéos récupérées avec le nom de la catégorie
    return { videos };
  } catch (error) {
    console.error("Erreur lors de la récupération des vidéos:", error);
    return { error: "Erreur lors de la récupération des vidéos" };
  }
});
