import { getConnection } from "~~/server/db.config";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const token = event.node.req.headers.authorization?.split(" ")[1]; // Récupérer le token JWT depuis les en-têtes

  if (!token) {
    return { error: "Token manquant. Accès non autorisé." };
  }

  try {
    // Vérifier le token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const roleId = decoded.role_id;

    // Vérifier si l'utilisateur est admin
    if (roleId !== 1) {
      return {
        error: "Accès interdit. Vous n'avez pas les droits suffisants.",
      };
    }

    // Récupérer l'ID de la vidéo depuis les paramètres
    const { videoId } = event.context.params;

    if (!videoId) {
      return { error: "ID de vidéo manquant." };
    }

    const connection = await getConnection();

    // Supprimer la vidéo
    await connection.execute(`DELETE FROM videos WHERE id = ?`, [videoId]);

    await connection.end();

    return { message: "Vidéo supprimée avec succès." };
  } catch (error) {
    console.error("Erreur lors de la suppression de la vidéo:", error);
    return { error: "Erreur lors de la suppression de la vidéo." };
  }
});
