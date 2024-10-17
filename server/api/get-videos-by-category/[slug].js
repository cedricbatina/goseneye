/**import { getConnection } from "~~/server/db.config"; // Assurez-vous que la configuration de la DB est correcte

export default defineEventHandler(async (event) => {
  try {
    // Récupérer le paramètre categoryId depuis l'URL
    const categoryId = event.context.params.categoryId;
    console.log(`Récupération des vidéos pour la catégorie ID : ${categoryId}`);

    // Connexion à la base de données
    const connection = await getConnection();
    console.log("Connexion à la base de données réussie");

    // Requête SQL pour récupérer les vidéos par category_id
    const [videos] = await connection.execute(
      "SELECT * FROM videos WHERE category_id = ?",
      [categoryId]
    );
    console.log("Vidéos récupérées :", videos);

    // Fermer la connexion après la requête
    await connection.end();
    console.log("Connexion fermée");

    // Vérification et retour des vidéos
    if (videos.length > 0) {
      return { videos };
    } else {
      return { error: "Aucune vidéo trouvée pour cette catégorie" };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des vidéos:", error);
    return { error: "Erreur lors de la récupération des vidéos" };
  }
});*/

// server/api/get-videos-by-category/[slug].js

import { getConnection } from "~~/server/db.config";

export default defineEventHandler(async (event) => {
  console.log("API get-videos-by-category appelée");

  const slug = event.context.params.slug;

  try {
    // Récupérer de la base de données
    const connection = await getConnection();
    console.log(
      `Récupération des vidéos pour la catégorie avec slug : ${slug}`
    );

    const [videos] = await connection.execute(
      `SELECT v.*, c.name AS categoryName
       FROM videos v
       JOIN categories c ON v.category_id = c.id
       WHERE c.slug = ?
       ORDER BY v.published_at DESC`,
      [slug]
    );

    await connection.end();

    if (videos.length > 0) {
      console.log(
        `Retour des vidéos pour la catégorie : ${videos[0].categoryName}`
      );

      return { videos, categoryName: videos[0].categoryName };
    } else {
      console.log("Aucune vidéo trouvée pour cette catégorie");
      return { videos: [], categoryName: "Aucune vidéo trouvée" };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des vidéos :", error);
    return { error: "Erreur lors de la récupération des vidéos" };
  }
});
