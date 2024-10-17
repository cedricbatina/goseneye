import { getConnection } from "~~/server/db.config";

export default defineEventHandler(async (event) => {
  const connection = await getConnection();

  // Récupérer la liste des utilisateurs
  const [users] = await connection.execute(`
    SELECT id, username, email, role_id FROM users
  `);

  await connection.end();

  return { users };
});
