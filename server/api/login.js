import { getConnection } from "~~/server/db.config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // Récupérer le corps de la requête
    const { email, password } = body;

    // Vérifier que tous les champs sont fournis
    if (!email || !password) {
      return { error: "Tous les champs sont obligatoires" };
    }

    const connection = await getConnection();

    // Vérifier si l'utilisateur existe avec cet email
    const [user] = await connection.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    // Si aucun utilisateur trouvé avec cet email
    if (user.length === 0) {
      return { error: "Utilisateur introuvable" };
    }

    // Comparer le mot de passe haché stocké avec le mot de passe fourni
    const isMatch = await bcrypt.compare(password, user[0].password_hash);

    if (!isMatch) {
      return { error: "Mot de passe incorrect" };
    }

    // Si le mot de passe correspond, générer un token JWT
    const token = jwt.sign(
      {
        userId: user[0].id,
        email: user[0].email,
        role_id: user[0].role_id,
        username: user[0].username, // Ajouter le username ici
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // Définir un cookie HTTPOnly pour stocker le JWT
    setCookie(event, "authToken", token, {
      httpOnly: true, // Empêche l'accès via JavaScript
      secure: process.env.NODE_ENV === "production", // Seulement sur HTTPS en production
      maxAge: 3600, // Expire dans 1 heure
      sameSite: "lax", // Politique SameSite
    });

    // Fermer la connexion à la base de données
    await connection.end();

    // Renvoyer un message de succès avec les informations de l'utilisateur et le token JWT
    return {
      message: "Connexion réussie",
      token,
      user: {
        id: user[0].id,
        email: user[0].email,
        username: user[0].username, // Ajoute le username ici
        role_id: user[0].role_id,
      },
    };
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return { error: "Erreur lors de la connexion" };
  }
});
