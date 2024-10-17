import { getConnection } from "~~/server/db.config";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const token = event.node.req.headers.authorization?.split(" ")[1]; // Récupérer le token JWT depuis les en-têtes

  if (!token) {
    return { error: "Token manquant. Accès non autorisé." };
  }

  try {
    // Charger la clé secrète depuis le fichier .env
    const secretKey = process.env.JWT_SECRET;

    // Vérifier le token JWT
    const decoded = jwt.verify(token, secretKey); // Utiliser la clé secrète à partir de l'environnement
    const roleId = decoded.role_id;

    // Vérifier si l'utilisateur est admin
    if (roleId !== 1) {
      return {
        error: "Accès interdit. Vous n'avez pas les droits suffisants.",
      };
    }

    // Récupérer les données envoyées dans la requête
    const body = await readBody(event);
    const { id, title, description, youtube_url, category_id, duration } = body;

    if (
      !id ||
      !title ||
      !description ||
      !youtube_url ||
      !category_id ||
      !duration
    ) {
      return { error: "Tous les champs sont obligatoires." };
    }

    const connection = await getConnection();

    // Mettre à jour la vidéo
    await connection.execute(
      `UPDATE videos 
       SET title = ?, description = ?, youtube_url = ?, category_id = ?, duration = ?, updated_at = NOW()
       WHERE id = ?`,
      [title, description, youtube_url, category_id, duration, id]
    );

    await connection.end();

    return { message: "Vidéo mise à jour avec succès." };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la vidéo:", error);
    return { error: "Erreur lors de la mise à jour de la vidéo." };
  }
});
