import { getConnection } from "~~/server/db.config";
import slugify from "slugify"; // Assurez-vous d'installer slugify via npm install slugify

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params; // Récupérer le slug de la vidéo à partir des paramètres
  const body = await readBody(event); // Lire les nouvelles données envoyées dans le corps de la requête

  try {
    const connection = await getConnection();

    // Générer un nouveau slug basé sur le titre
    let baseSlug = slugify(body.title, { lower: true, strict: true });
    let newSlug = baseSlug;
    let count = 1;

    // Vérifier l'unicité du nouveau slug
    while (true) {
      const [existing] = await connection.execute(
        "SELECT id FROM videos WHERE slug = ? AND slug != ?",
        [newSlug, slug]
      );
      if (existing.length === 0) break;
      newSlug = `${baseSlug}-${count}`;
      count++;
    }

    // Mettre à jour les champs de la vidéo dans la base de données, y compris la durée et le nouveau slug
    const [result] = await connection.execute(
      `UPDATE videos 
       SET title = ?, description = ?, youtube_url = ?, category_id = ?, duration = ?, slug = ?
       WHERE slug = ?`,
      [
        body.title,
        body.description,
        body.youtube_url,
        body.category_id,
        body.duration,
        newSlug, // Utiliser le nouveau slug généré
        slug,
      ]
    );

    await connection.end();

    // Vérifier si la mise à jour a réussi
    if (result.affectedRows === 1) {
      return {
        success: true,
        message: "Vidéo mise à jour avec succès",
        slug: newSlug,
      };
    } else {
      return { success: false, error: "Échec de la mise à jour de la vidéo" };
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la vidéo:", error);
    return {
      success: false,
      error: "Erreur lors de la mise à jour de la vidéo",
    };
  }
});
