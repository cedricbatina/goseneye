import { getConnection } from "~~/server/db.config";

export default defineEventHandler(async (event) => {
  const connection = await getConnection();

  // Récupérer le nombre total d'utilisateurs
  const [users] = await connection.execute(
    `SELECT COUNT(*) as totalUsers FROM users`
  );

  // Récupérer le nombre total de vidéos
  const [videos] = await connection.execute(
    `SELECT COUNT(*) as totalVideos FROM videos`
  );

  // Récupérer le nombre total de catégories
  const [categories] = await connection.execute(
    `SELECT COUNT(*) as totalCategories FROM categories`
  );

  await connection.end();

  // Retourner les statistiques
  return {
    totalUsers: users[0].totalUsers,
    totalVideos: videos[0].totalVideos,
    totalCategories: categories[0].totalCategories,
  };
});
