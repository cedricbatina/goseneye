import { getConnection } from "~~/server/db.config"; // Assure-toi que le chemin est correct

export default defineEventHandler(async (event) => {
  try {
    console.log("Connexion à la base de données..."); // Log pour vérifier que la connexion démarre
    // Connexion à la base de données
    const connection = await getConnection();
    console.log("Connexion réussie."); // Log si la connexion est réussie

    // Requête SQL pour récupérer les catégories avec leur dernière vidéo
    const [categoriesWithVideos] = await connection.execute(`
      SELECT c.id as category_id, c.name as category_name, c.slug as category_slug, 
             v.id as video_id, v.title as video_title, v.thumbnail_url, v.slug as video_slug, 
             v.published_at
      FROM categories c
      JOIN videos v ON v.id = (
        SELECT v2.id
        FROM videos v2
        WHERE v2.category_id = c.id
        ORDER BY v2.published_at DESC
        LIMIT 1
      )
      ORDER BY v.published_at DESC;
    `);

    console.log("Requête exécutée avec succès :", categoriesWithVideos); // Log les résultats de la requête

    await connection.end();

    // Organiser les résultats en regroupant les vidéos par catégorie
    const categories = {};
    categoriesWithVideos.forEach((row) => {
      if (!categories[row.category_slug]) {
        categories[row.category_slug] = {
          id: row.category_id,
          name: row.category_name,
          slug: row.category_slug,
          lastVideo: {
            title: row.video_title,
            thumbnail_url: row.thumbnail_url,
            slug: row.video_slug,
          },
        };
      }
    });

    console.log("Résultat final des catégories :", Object.values(categories)); // Log le résultat final

    // Convertir l'objet en tableau pour le retour
    return Object.values(categories);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des catégories et vidéos :",
      error
    );
    return { error: "Erreur lors de la récupération des données" };
  }
});
