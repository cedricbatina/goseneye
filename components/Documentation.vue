<template>
  <div class="documentation">
    <h1>Documentation du Système de Gestion de Vidéos</h1>
    <section>
      <h2>Introduction</h2>
      <p>
        Bienvenue sur la documentation du système de gestion de vidéos. Cette
        plateforme permet aux utilisateurs de visionner et de rechercher des
        vidéos, et aux administrateurs de gérer le contenu, les catégories et
        les utilisateurs. Ce guide détaillé est destiné à tous les utilisateurs
        et administrateurs, ainsi qu'aux développeurs souhaitant comprendre le
        fonctionnement du projet.
      </p>
    </section>

    <section>
      <h2>Guide de l'utilisateur</h2>
      <p>
        Ce guide a pour but de vous aider à naviguer sur le site et à trouver
        les vidéos qui vous intéressent. Tout le monde peut visionner les vidéos
        disponibles sur le site, sans besoin de créer un compte.
      </p>
      <ul>
        <li>
          <strong>Navigation :</strong> Utilisez la barre de navigation en haut
          du site pour explorer les vidéos par catégorie ou utilisez la barre de
          recherche pour trouver du contenu spécifique.
        </li>
        <li>
          <strong>Recherche de Vidéos :</strong> La barre de recherche vous
          permet de trouver des vidéos en fonction de leur titre. Les résultats
          s'affichent en temps réel pour vous offrir une expérience fluide.
        </li>
        <li>
          <strong>Catégories :</strong> Vous pouvez explorer les vidéos par
          catégorie pour découvrir du contenu pertinent plus facilement. Chaque
          catégorie est affichée dans la page principale, avec les vidéos
          associées.
        </li>
        <li>
          <strong>Lecture des Vidéos :</strong> Cliquez sur une vidéo pour la
          visionner. Vous pouvez également partager les vidéos sur les réseaux
          sociaux via les boutons prévus à cet effet.
        </li>
        <li>
          <strong>Favoris :</strong> Enregistrez vos vidéos préférées en tant
          que favoris pour les retrouver facilement plus tard.
        </li>
      </ul>
    </section>

    <section>
      <h2>Guide de l'administrateur</h2>
      <p>
        Ce guide est destiné aux administrateurs du site qui gèrent les vidéos,
        les catégories, et les utilisateurs.
      </p>
      <ul>
        <li>
          <strong>Gestion des vidéos :</strong> Vous pouvez ajouter, modifier ou
          supprimer des vidéos en accédant à la section "Gestion des Vidéos".
          Chaque vidéo peut être assignée à une catégorie. Assurez-vous que les
          titres et descriptions sont appropriés pour maintenir une qualité
          constante du contenu.
        </li>
        <li>
          <strong>Gestion des catégories :</strong> Créez et modifiez des
          catégories pour organiser le contenu de manière efficace. Les
          catégories permettent une meilleure expérience utilisateur en
          facilitant la recherche des vidéos.
        </li>
        <li>
          <strong>Gestion des utilisateurs :</strong> En tant qu'administrateur,
          vous pouvez créer des comptes utilisateurs, modifier leurs
          informations ou les supprimer. Vous pouvez également attribuer des
          rôles (utilisateur ou administrateur).
        </li>
        <li>
          <strong>Statistiques :</strong> Accédez aux statistiques du site pour
          voir le nombre de vidéos publiées, le nombre d'utilisateurs inscrits,
          et les vidéos les plus visionnées. Ces données vous permettent
          d'optimiser le contenu.
        </li>
        <li>
          <strong>Sécurité :</strong> Assurez-vous que les utilisateurs suivent
          les règles et supprimez les contenus inappropriés si nécessaire. La
          gestion des rôles et des permissions est essentielle pour la sécurité
          du site.
        </li>
      </ul>
    </section>
    <section>
      <h2>Technologies Utilisées</h2>
      <p>Ce projet utilise les technologies suivantes :</p>
      <ul>
        <li>
          <strong>Frontend :</strong> Nuxt.js (framework Vue.js) pour la gestion
          des composants et la responsivité. Le site est conçu pour être rapide
          et réactif sur tous les appareils.
        </li>
        <li>
          <strong>Backend :</strong> API RESTful pour gérer les données
          (création, mise à jour, suppression) en utilisant des appels fetch.
        </li>
        <li>
          <strong>Base de données :</strong> Stockage des vidéos, utilisateurs,
          et catégories, géré par une API serveur MySQL.
        </li>
        <li>
          <strong>Gestion de l’état :</strong> Pinia est utilisé pour la gestion
          centralisée des données utilisateur et des vidéos.
        </li>
        <li>
          <strong>Style :</strong> CSS moderne avec des media queries pour
          garantir la responsivité. Le thème visuel est sombre (#000) avec des
          éléments dorés (#f8c471) et du texte blanc pour assurer un contraste
          élégant et une accessibilité optimale.
        </li>
        <li>
          <strong>SEO :</strong> Utilisation de balises meta pour optimiser le
          référencement du site, y compris des titres, descriptions et mots-clés
          pertinents.
        </li>
        <li>
          <strong>Envoi de mails :</strong> Brevo (anciennement Sendinblue) pour
          l'envoi d'e-mails transactionnels, intégré avec Nodemailer pour gérer
          les notifications par e-mail.
        </li>
        <li>
          <strong>Interface Utilisateur :</strong> Bootstrap est utilisé pour le
          style et la mise en page des composants afin d'assurer une expérience
          utilisateur cohérente et réactive.
        </li>
        <li>
          <strong>Icônes :</strong> FontAwesome est utilisé pour les icônes du
          site, notamment dans les boutons d'action, pour améliorer la
          convivialité de l'interface.
        </li>
      </ul>
    </section>

    <section>
      <h2>Questions fréquentes</h2>
      <p>
        Voici quelques questions fréquentes qui pourront vous aider à résoudre
        des problèmes courants.
      </p>
      <ul>
        <li>
          <strong>Comment ajouter une nouvelle vidéo ?</strong> Rendez-vous dans
          la section "Gestion des Vidéos" du panneau administrateur et cliquez
          sur "Ajouter une Vidéo". Remplissez les champs requis et cliquez sur
          "Enregistrer".
        </li>
        <li>
          <strong>Comment modifier une catégorie ?</strong> Accédez à la section
          "Gestion des Catégories" et cliquez sur l'icône d'édition à côté de la
          catégorie à modifier. N'oubliez pas d'enregistrer vos modifications.
        </li>
        <li>
          <strong
            >Je n'arrive pas à me connecter en tant qu'administrateur, que faire
            ?</strong
          >
          Assurez-vous que vos identifiants sont corrects. Si le problème
          persiste, contactez l'administrateur principal ou utilisez la fonction
          de réinitialisation de mot de passe.
        </li>
        <li>
          <strong>Comment supprimer un utilisateur ?</strong> Rendez-vous dans
          la section "Gestion des Utilisateurs", recherchez l'utilisateur
          concerné et cliquez sur "Supprimer". Confirmez l'action pour finaliser
          la suppression.
        </li>
      </ul>
    </section>

    <section>
      <h2>Support technique</h2>
      <p>
        Si vous rencontrez des problèmes techniques ou avez besoin d'aide
        supplémentaire, veuillez contacter l'équipe de support en utilisant le
        formulaire de contact disponible sur la page "Contact". Nous vous
        répondrons dans les plus brefs délais.
      </p>
    </section>
    <section>
      <h2>Réseaux sociaux</h2>
      <p>
        Vous pouvez également nous suivre sur les réseaux sociaux pour obtenir
        des mises à jour :
      </p>
      <SocialMedia />
    </section>

    <section>
      <h2>Navigation sur le Site</h2>
      <p>Pour naviguer sur le site :</p>
      <ul>
        <li>
          Utilisez la barre de navigation principale en haut de chaque page pour
          accéder aux différentes sections, comme les catégories de vidéos, les
          vidéos récentes, ou votre profil.
        </li>
        <li>
          Le pied de page contient des liens vers des pages importantes, comme
          la documentation, la page "Contact" et les réseaux sociaux.
        </li>
        <li>
          Les vidéos peuvent être filtrées par catégorie ou recherchées via la
          barre de recherche présente sur toutes les pages.
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import { useHead } from "#imports";

export default {
  name: "Documentation",
};
</script>

<style scoped>
.documentation {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #000;
  color: #f8c471;
}
.documentation h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #f8c471;
  font-size: 26px;
}
.documentation h2 {
  margin-bottom: 20px;
  color: #f8c471;
  font-size: 20px;
}
.documentation h2 {
  margin-top: 30px;
  color: #f8c471;
}
.documentation p {
  color: #ffffff;
  line-height: 1.6;
}
.documentation ul {
  list-style-type: disc;
  padding-left: 20px;
}
.documentation li {
  margin-bottom: 10px;
  color: #ffffff;
}
.documentation a {
  color: #f8c471;
  text-decoration: none;
}
.documentation a:hover {
  text-decoration: underline;
}
@media (max-width: 600px) {
  .documentation {
    padding: 10px;
  }
  .documentation h1 {
    font-size: 1.2em;
  }
  .documentation h2 {
    font-size: 1.1em;
  }
  .documentation p,
  .documentation li {
    font-size: 0.75em;
  }
}
</style>