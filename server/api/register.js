import { getConnection } from "~~/server/db.config";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return { error: "Tous les champs sont obligatoires" };
    }

    // Hachage du mot de passe
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const connection = await getConnection();

    // Vérification si l'utilisateur existe déjà avec cet email
    const [existingUser] = await connection.execute(
      `
      SELECT * FROM users WHERE email = ?
    `,
      [email]
    );

    if (existingUser.length > 0) {
      return { error: "Cet utilisateur existe déjà avec cet email" };
    }

    // Insertion dans la table `users`
    const [result] = await connection.execute(
      `
      INSERT INTO users (username, email, password_hash)
      VALUES (?, ?, ?)
    `,
      [username, email, passwordHash]
    );

    await connection.end();

    return { message: "Utilisateur créé avec succès", userId: result.insertId };
  } catch (error) {
    console.error("Error during user registration:", error);
    return { error: "Erreur lors de la création de l'utilisateur" };
  }
});
