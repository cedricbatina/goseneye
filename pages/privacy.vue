<template>
  <div class="privacy-page">
    <div class="container">
      <h1 class="page-title">Mentions Légales</h1>

      <section class="section">
        <h2 class="section-title">Éditeur du Site</h2>
        <p>
          Le site internet
          <a href="https://www.goseneye.com" target="_blank"
            >https://www.goseneye.com</a
          >
          est édité par <strong>Gosen’Eye</strong>, société spécialisée dans la
          production vidéo – montage, cadrage, réalisation – et reconnue pour
          son expertise dans la création de contenus visuels de qualité pour les
          entreprises, les projets commerciaux et les initiatives de
          divertissement.
        </p>
        <p>
          <strong>Gosen’Eye</strong> est une société de production vidéo
          immatriculée sous le SIRET <strong>802 146 415 00020</strong>, dirigée
          par M. Alpha Diallo, dont le siège social est situé au
          <strong>68 Rue Soubiras, 33200 Bordeaux, France</strong>.
        </p>
      </section>

      <section class="section">
        <h2 class="section-title">Contact</h2>
        <ul class="contact-list">
          <li>
            <i class="fas fa-envelope"></i> Email :
            <a href="mailto:gosen.eye@gmail.com">gosen.eye@gmail.com</a>
          </li>
          <li>
            <i class="fas fa-phone-alt"></i> Téléphone :
            <a href="tel:+33664538526">+33 6 64 53 85 26</a>
          </li>
        </ul>
      </section>

      <section class="section">
        <h2 class="section-title">Hébergeur</h2>
        <p>
          Le site
          <a href="https://www.goseneye.com" target="_blank"
            >https://www.goseneye.com</a
          >
          est hébergé par la société <strong>Infomaniak Network SA</strong>.
        </p>
        <p>
          Adresse : Rue Eugène-Marziano 25, 1227 Les Acacias (GE), Suisse<br />
          Site web :
          <a href="https://www.infomaniak.com/" target="_blank"
            >https://www.infomaniak.com/</a
          >
        </p>
      </section>

      <section class="section">
        <h2 class="section-title">Propriété Intellectuelle</h2>
        <p>
          Le contenu du site est protégé par les lois en vigueur sur la
          propriété intellectuelle et le droit d’auteur. Toute reproduction ou
          représentation intégrale ou partielle, par quelque procédé que ce
          soit, faite sans le consentement préalable écrit de
          <strong>Gosen’Eye</strong> est illicite et constitue une contrefaçon
          sanctionnée par les articles L.335-2 et suivants du Code de la
          propriété intellectuelle.
        </p>
      </section>

      <section class="section">
        <h2 class="section-title">Cookies</h2>
        <p>
          Le site utilise des cookies pour améliorer l’expérience utilisateur et
          pour réaliser des statistiques de visites. Les cookies sont de petits
          fichiers textes stockés sur votre appareil lorsque vous naviguez sur
          notre site.
        </p>
        <p>
          En aucun cas, les cookies ne sont utilisés pour collecter des
          informations personnelles sans le consentement explicite de
          l’utilisateur. Vous pouvez configurer votre navigateur pour accepter
          ou refuser les cookies. Cependant, le refus des cookies peut limiter
          certaines fonctionnalités du site.
        </p>
      </section>

      <section class="section">
        <h2 class="section-title">Conception et Réalisation du Site</h2>
        <p>
          Le site a été conçu et est maintenu par
          <strong>@rtful Batina Creative Studios</strong>, une entreprise
          individuelle dirigée par M. Cédric Batina.
        </p>
        <ul class="contact-list">
          <li><strong>SIRET :</strong> 911 940 070 00012</li>
          <li>
            <strong>Adresse :</strong> Boulevard Malartic, Résidence Barthès 4A,
            porte 379, 33170 Gradignan, France
          </li>
          <li>
            <i class="fas fa-envelope"></i> Email :
            <a href="mailto:artfulbatinacreativestudios@gmail.com"
              >artfulbatinacreativestudios@gmail.com</a
            >
          </li>
          <li>
            <i class="fas fa-phone-alt"></i> Téléphone :
            <a href="tel:+33748484902">+33 7 48 48 49 02</a>
          </li>
          <li>
            <strong>Site web :</strong>
            <a href="https://www.artfulbatinacreativestudios.fr" target="_blank"
              >https://www.artfulbatinacreativestudios.fr</a
            >
          </li>
        </ul>
      </section>

      <section class="section">
        <h2 class="section-title">Loi Applicable</h2>
        <p>
          Le présent site est régi par le droit français. Pour toute question
          relative à l’application de ces mentions légales, l’utilisateur peut
          se référer au site officiel Légifrance à l’adresse :
          <a href="https://www.legifrance.gouv.fr/" target="_blank"
            >https://www.legifrance.gouv.fr/</a
          >.
        </p>
      </section>

      <section class="section">
        <h2 class="section-title">Litiges</h2>
        <p>
          En cas de litige, compétence exclusive est attribuée aux tribunaux
          français compétents.
        </p>
      </section>

      <section class="section">
        <h2 class="section-title">Engagements de Gosen’Eye</h2>
        <p>
          Chez <strong>Gosen’Eye</strong>, nous nous dévouons à transformer des
          visions en réalités visuelles, en mettant notre passion et notre
          créativité au service de vos histoires à raconter. Notre ambition est
          d’exceller dans l’art de la production vidéo pour capturer l’essence
          de chaque projet et le retranscrire au-delà des attentes.
        </p>
      </section>
    </div>
  </div>
</template>
<script setup>
import { useHead } from "#imports"; // Utiliser useHead pour SEO

useHead(() => {
  const title = "Mentions Légales | Gosen'Eye";
  const description =
    "Découvrez les mentions légales et engagements de Gosen'Eye, société spécialisée dans la production vidéo à Bordeaux.";

  return {
    title,
    meta: [
      { name: "description", content: description },
      {
        name: "keywords",
        content: "mentions légales, Gosen'Eye, production vidéo, Bordeaux",
      },
      // Open Graph
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.goseneye.com/privacy" },
      {
        property: "og:image",
        content: "https://www.goseneye.com/public/images/signature.png",
      },
      // Twitter Card
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: "https://www.goseneye.com/public/images/signature.png",
      },
    ],
  };
});
</script>


<style scoped>
.privacy-page {
  background-color: #000;
  color: #f8c471;
  padding: 50px 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  font-size: 2.5em;
  margin-bottom: 40px;
  text-align: center;
  color: #f8c471;
}

.section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.8em;
  margin-bottom: 20px;
  border-bottom: 2px solid #f8c471;
  padding-bottom: 10px;
  color: #f8c471;
}

p {
  line-height: 1.6;
  margin-bottom: 15px;
}

ul.contact-list {
  list-style: none;
  padding: 0;
}

ul.contact-list li {
  margin-bottom: 10px;
  line-height: 1.6;
}

ul.contact-list li i {
  margin-right: 10px;
}

a {
  color: #f8c471;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

strong {
  color: #f8c471;
}

@media (max-width: 600px) {
  .page-title {
    font-size: 2em;
  }

  .section-title {
    font-size: 1.5em;
  }
}
h1 {
  font-size: 18px;
}
h2 {
  font-size: 14px;
}
</style>
