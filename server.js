import { createServer } from "http";
import { fromNodeMiddleware } from "h3";
import { useRuntimeConfig } from "#internal/nitro";
import { createApp } from "#internal/nitro/entry";

const app = createApp();
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
  if (req.url && req.url !== "/favicon.ico") {
    // Rediriger toutes les routes non trouvées vers la page d'accueil de l'application Nuxt
    req.url = "/";
  }
  next();
});

const server = createServer(fromNodeMiddleware(app));
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
