import { getConnection } from "~~/server/db.config";
import jwt from "jsonwebtoken";

// Fonction pour générer un slug à partir du titre
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Remplace les caractères non alphanumériques par des tirets
    .replace(/^-+|-+$/g, ""); // Supprime les tirets en début ou fin de chaîne
}

export default defineEventHandler(async (event) => {
  // Récupérer le token d'authentification depuis l'en-tête
  const authHeader = event.node.req.headers["authorization"];
  if (!authHeader) {
    return { statusCode: 401, message: "Token d'authentification manquant." };
  }

  const token = authHeader.split(" ")[1]; // Extraire le token
  let decodedToken;

  try {
    // Décoder le token avec la clé secrète
    decodedToken = jwt.verify(token, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Token JWT décodé :", decodedToken);
  } catch (err) {
    return { statusCode: 401, message: "Token invalide ou expiré." };
  }

  // Vérifier si l'utilisateur est un administrateur (role_id doit être égal à 1)
  if (decodedToken.role_id !== 1) {
    return {
      statusCode: 403,
      message:
        "Accès interdit. Vous devez être administrateur pour créer une vidéo.",
    };
  }

  // Récupérer les données envoyées par le formulaire
  const body = await readBody(event);

  // Vérifier si toutes les données sont fournies
  if (
    !body.title ||
    !body.youtube_url ||
    !body.category_id ||
    !body.description ||
    !body.duration
  ) {
    return {
      statusCode: 400,
      message:
        "Titre, URL YouTube, catégorie, description et durée sont requis.",
    };
  }

  // Générer le slug à partir du titre de la vidéo
  const slug = generateSlug(body.title);

  // Extraire l'ID de la vidéo YouTube de l'URL fournie
  const youtubeVideoId =
    body.youtube_url.split("v=")[1]?.split("&")[0] ||
    body.youtube_url.split("/").pop().split("&")[0];

  // Générer l'URL de la miniature YouTube
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`;

  try {
    const connection = await getConnection();

    console.log("Données envoyées pour insertion :", body);

    // Récupérer la date actuelle pour `published_at`
    const publishedAt = new Date();

    const query = `
      INSERT INTO videos (title, youtube_url, description, category_id, user_id, published_at, thumbnail_url, slug, duration)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      body.title,
      body.youtube_url,
      body.description,
      body.category_id,
      decodedToken.userId, // Utiliser l'ID de l'utilisateur extrait du token
      publishedAt, // Date actuelle pour la publication
      thumbnailUrl, // Ajouter l'URL de la miniature générée
      slug, // Ajouter le slug généré
      body.duration, // Ajouter la durée de la vidéo
    ];

    console.log("Requête SQL d'insertion :", query);
    console.log("Valeurs à insérer :", values);

    // Exécuter la requête d'insertion et log le résultat
    const [result] = await connection.execute(query, values);
    console.log("Résultat de la requête SQL :", result);

    await connection.end();

    if (result.affectedRows === 1) {
      return { success: true, message: "Vidéo créée avec succès." };
    } else {
      console.error("Erreur : Aucune ligne affectée par la requête SQL.");
      return { success: false, message: "Échec de l'insertion de la vidéo." };
    }
  } catch (error) {
    console.error("Erreur lors de la création de la vidéo :", error);
    return {
      success: false,
      message: "Erreur lors de la création de la vidéo.",
    };
  }
});
