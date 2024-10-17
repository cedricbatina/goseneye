<template>
  <div class="homepage-container">
    <div class="page-header">
      <h1>Bienvenue sur la page d'inscription</h1>
      <p>
        Créez un compte pour accéder à notre communauté et découvrir des
        contenus exclusifs. Remplissez les informations ci-dessous pour
        finaliser votre inscription.
      </p>
    </div>

    <!-- Formulaire d'inscription -->
    <Register />
  </div>
</template>

<script setup>
import { useHead } from "#imports"; // Importer useHead

// SEO metadata pour la page d'inscription
useHead({
  title: "Inscription | Gosen Eye",
  meta: [
    {
      name: "description",
      content:
        "Rejoignez Gosen Eye et créez un compte pour accéder à nos vidéos exclusives et profiter de notre communauté.",
    },
    {
      name: "keywords",
      content: "inscription, création de compte, vidéos, communauté, Gosen Eye",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      property: "og:title",
      content: "Inscription | Gosen Eye",
    },
    {
      property: "og:description",
      content:
        "Créez un compte pour découvrir nos vidéos exclusives et rejoindre notre communauté.",
    },
    {
      property: "og:url",
      content: "https://goseneye.com/register",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
});
</script>

<style scoped>
/* Mise en page pour la page d'inscription */

/* Section header pour présenter la page */
.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 28px;
  margin-bottom: 15px;
  color: #f8c471; /* Texte doré */
}

.page-header p {
  font-size: 16px;
  color: #f1f1f1;
  line-height: 1.6;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .homepage-container {
    padding: 20px;
  }

  .page-header h1 {
    font-size: 24px;
  }

  .page-header p {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 22px;
  }

  .page-header p {
    font-size: 13px;
  }
}
</style>
