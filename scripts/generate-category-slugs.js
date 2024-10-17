// scripts/generate-category-slugs.js

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

// Fonction pour générer un slug unique
const generateUniqueSlug = async (name, connection, currentId = null) => {
  let baseSlug = slugify(name, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;

  while (true) {
    // Si currentId est fourni, exclure la catégorie actuelle de la vérification
    const [existingCategories] = currentId
      ? await connection.execute(
          "SELECT id FROM categories WHERE slug = ? AND id != ?",
          [slug, currentId]
        )
      : await connection.execute("SELECT id FROM categories WHERE slug = ?", [
          slug,
        ]);

    if (existingCategories.length === 0) break;
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
};

// Fonction principale pour générer et assigner des slugs aux catégories existantes
const generateSlugsForCategories = async () => {
  let connection;
  try {
    // Créer une connexion à la base de données
    connection = await mysql.createConnection(dbConfig);
    console.log("Connexion à la base de données réussie.");

    // Récupérer toutes les catégories sans slug
    const [categories] = await connection.execute(
      "SELECT id, name FROM categories WHERE slug IS NULL OR slug = ''"
    );

    console.log(
      `Nombre de catégories sans slug trouvées : ${categories.length}`
    );

    for (const category of categories) {
      // Générer le slug à partir du nom
      const slug = await generateUniqueSlug(
        category.name,
        connection,
        category.id
      );

      // Mettre à jour la catégorie avec le slug unique
      await connection.execute("UPDATE categories SET slug = ? WHERE id = ?", [
        slug,
        category.id,
      ]);

      console.log(`Slug généré pour la catégorie ID ${category.id} : ${slug}`);
    }

    console.log("Génération des slugs des catégories terminée.");
  } catch (error) {
    console.error(
      "Erreur lors de la génération des slugs des catégories :",
      error
    );
  } finally {
    if (connection) {
      await connection.end();
      console.log("Connexion à la base de données fermée.");
    }
  }
};

// Exécuter la fonction
generateSlugsForCategories();
