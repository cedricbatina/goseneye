import { getConnection } from "~~/server/db.config";
import slugify from "slugify"; // Utilisation de slugify pour générer des slugs propres

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name } = body;

  if (!name) {
    return { error: "Le nom de la catégorie est obligatoire" };
  }

  try {
    const connection = await getConnection();
    const slug = slugify(name, { lower: true }); // Générer un slug propre à partir du nom

    const [result] = await connection.execute(
      "INSERT INTO categories (name, slug) VALUES (?, ?)",
      [name, slug]
    );

    await connection.end();

    return {
      message: "Catégorie créée avec succès",
      categoryId: result.insertId,
      slug,
    };
  } catch (error) {
    console.error("Erreur lors de la création de la catégorie :", error);
    return { error: "Erreur lors de la création de la catégorie" };
  }
});
