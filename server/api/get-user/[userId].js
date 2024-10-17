// /api/get-user/[userId].js
import { getConnection } from "~~/server/db.config"; // Utilise ta configuration de base de données

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params;

  try {
    const connection = await getConnection();

    // Récupérer les informations de l'utilisateur par son ID
    const [user] = await connection.execute(
      "SELECT id, username, email, role_id FROM users WHERE id = ?",
      [userId]
    );

    // Vérifier si l'utilisateur existe
    if (user.length === 0) {
      return { error: "Utilisateur introuvable" };
    }

    // Retourner les détails de l'utilisateur
    return { user: user[0] };
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return { error: "Erreur lors de la récupération de l'utilisateur" };
  }
});
