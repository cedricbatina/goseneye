// /api/search-videos.js
import { getConnection } from "~~/server/db.config";

export default defineEventHandler(async (event) => {
  const { query } = getQuery(event); // Récupère le terme de recherche depuis l'URL

  if (!query) {
    return { videos: [] }; // Si aucun terme de recherche n'est fourni, retourner une liste vide
  }

  try {
    const connection = await getConnection();

    // Requête SQL pour rechercher les vidéos par titre avec LIKE
    const [videos] = await connection.execute(
      `
      SELECT id, title, youtube_url, description, slug
      FROM videos
      WHERE title LIKE ?
      `,
      [`%${query}%`] // Recherche le terme dans le titre des vidéos
    );

    // Fermer la connexion
    await connection.end();

    // Retourner les vidéos trouvées
    return {
      videos,
    };
  } catch (error) {
    console.error("Erreur lors de la recherche des vidéos:", error);
    return { error: "Erreur lors de la recherche des vidéos" };
  }
});
