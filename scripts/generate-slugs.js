// scripts/generate-slugs.js

import mysql from "mysql2/promise";
import slugify from "slugify";

// Informations de connexion à la base de données
const dbConfig = {
  host: "localhost", // Remplacez par votre hôte si différent
  user: "cedricbatina", // Votre nom d'utilisateur MySQL
  password: "Elijahbatina2008", // Votre mot de passe MySQL
  database: "goseneye", // Remplacez par le nom réel de votre base de données
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const generateSlugsForExistingVideos = async () => {
  let connection;
  try {
    // Créer une connexion à la base de données
    connection = await mysql.createConnection(dbConfig);
    console.log("Connexion à la base de données réussie.");

    // Récupérer toutes les vidéos sans slug
    const [videos] = await connection.execute(
      "SELECT id, title FROM videos WHERE slug IS NULL OR slug = ''"
    );

    console.log(`Nombre de vidéos sans slug trouvées : ${videos.length}`);

    for (const video of videos) {
      // Générer le slug à partir du titre
      let baseSlug = slugify(video.title, { lower: true, strict: true });
      let slug = baseSlug;
      let count = 1;

      // Vérifier l'unicité du slug
      while (true) {
        const [existing] = await connection.execute(
          "SELECT id FROM videos WHERE slug = ?",
          [slug]
        );
        if (existing.length === 0) break;
        slug = `${baseSlug}-${count}`;
        count++;
      }

      // Mettre à jour la vidéo avec le slug unique
      await connection.execute("UPDATE videos SET slug = ? WHERE id = ?", [
        slug,
        video.id,
      ]);

      console.log(`Slug généré pour la vidéo ID ${video.id} : ${slug}`);
    }

    console.log("Génération des slugs terminée.");
  } catch (error) {
    console.error("Erreur lors de la génération des slugs :", error);
  } finally {
    if (connection) {
      await connection.end();
      console.log("Connexion à la base de données fermée.");
    }
  }
};

// Exécuter la fonction
generateSlugsForExistingVideos();
