import { getConnection } from "~~/server/db.config";
import slugify from "slugify";

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params;
  const body = await readBody(event);
  const { name } = body;

  if (!name) {
    return { error: "Le nom de la catégorie est requis." };
  }

  const newSlug = slugify(name, { lower: true });

  try {
    const connection = await getConnection();

    // Vérifier si un autre enregistrement avec le même slug existe
    const [existing] = await connection.execute(
      "SELECT id FROM categories WHERE slug = ? AND slug != ?",
      [newSlug, slug]
    );

    if (existing.length > 0) {
      return { error: "Une autre catégorie avec ce slug existe déjà." };
    }

    // Mettre à jour la catégorie
    await connection.execute(
      "UPDATE categories SET name = ?, slug = ? WHERE slug = ?",
      [name, newSlug, slug]
    );

    return { success: true, message: "Catégorie mise à jour avec succès." };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la catégorie :", error);
    return { error: "Erreur lors de la mise à jour de la catégorie." };
  }
});
