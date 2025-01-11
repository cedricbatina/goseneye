<template>
  <footer class="footer">
    <div class="container">
      <!-- Logo centré au-dessus des sections -->
      <div class="logo-wrapper">
        <LogoFooter class="footer-logo" />
      </div>

      <!-- Grille du footer -->
      <div class="footer-grid">
        <!-- Section Informations de contact -->
        <div class="footer-section contact-info">
          <h4 class="footer-title">Adresse</h4>
          <p><i class="fa fa-map-marker-alt m-2"></i> Bordeaux et ailleurs</p>
          <p><i class="fa fa-phone-alt m-2"></i> +33 6 64 53 85 26</p>
          <p><i class="fa fa-envelope m-2"></i> gosen.eye@gmail.com</p>
        </div>

        <!-- Section Réseaux Sociaux -->
        <div class="footer-section social-media-section">
          <h4 class="footer-title">Réseaux sociaux</h4>
          <!-- Inclure les icônes des réseaux sociaux -->
          <div class="social-media">
            <a
              :href="links.linkedin"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
            >
              <i class="fab fa-linkedin"></i>
            </a>
            <a
              :href="links.instagram"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              :href="links.facebook"
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
            >
              <i class="fab fa-facebook"></i>
            </a>
            <a
              :href="links.googleMaps"
              target="_blank"
              rel="noopener"
              aria-label="Google Maps"
            >
              <i class="fas fa-map-marker-alt"></i>
            </a>
          </div>
        </div>

        <!-- Section Lien vers la page de connexion et mentions légales -->
        <div class="footer-section">
          <h4 class="footer-title">Liens utiles</h4>
          <p>
            <nuxt-link to="/documentation" class="footer-link"
              >Documentation</nuxt-link
            >
          </p>
          <p>
            <nuxt-link to="/privacy" class="footer-link"
              >Mentions Légales</nuxt-link
            >
          </p>

          <p>
            <nuxt-link to="/login" class="footer-link">Admin</nuxt-link>
          </p>
        </div>
      </div>

      <!-- Section Copyright et crédits -->
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Gosen Eye - Contenus protégés</p>
        <p>
          Site conçu et maintenu par :
          <a
            class="footer-link"
            href="https://artfulbatinacreativestudios.fr"
            target="_blank"
            >Artful Batina Creative Studios</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();

const links = {
  linkedin: "https://www.linkedin.com/in/alpha-gosen-eye/",
  instagram: "https://www.instagram.com/gosen_eye/",
  facebook: "https://www.facebook.com/Gosen.Eye/",
  googleMaps: `https://www.google.com/maps/place/Gosen'Eye+-+Production+vid%C3%A9os+Bordeaux/@44.899385,-0.4729274,9z/data=!3m1!4b1!4m6!3m5!1s0xd55297fcddf5373:0xc8cd2a8600691d74!8m2!3d44.899385!4d-0.4729274!16s%2Fg%2F11pxx739_0?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D`,
};
</script>

<style scoped>
.footer {
  background-color: #000;
  color: #f8c471;
  padding: 40px 0;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Section pour le logo centré */
.logo-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.footer-logo {
  max-width: 75%; /* Ajustez en pourcentage selon la taille désirée */
  height: auto; /* Maintient les proportions du logo */
  display: block; /* S'assure que l'image est considérée comme un bloc */
  margin: 0 auto; /* Centre l'image horizontalement */
}

/* Pour les écrans plus petits, réduire légèrement la taille du logo */
@media (max-width: 768px) {
  .footer-logo {
    max-width: 75%; /* Taille plus grande sur petits écrans */
  }
}

/* Grille du footer */
.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  justify-items: center;
  margin-bottom: 30px;
}

/* Pour les écrans moyens et grands */
@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.footer-section {
  width: 100%;
}

.footer-title {
  margin-bottom: 20px;
  font-size: 1.2em;
}

.contact-info p,
.login-section p {
  margin: 5px 0;
}

.footer-link,
.fa {
  color: #f8c471;
  text-decoration: none;
}

.footer-link:hover {
  color: #f8a471;
}

.social-media {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-media a {
  color: #f8c471;
  font-size: 24px;
  transition: color 0.3s;
}

.social-media a:hover {
  color: #f8a471;
}

.footer-bottom {
  border-top: 1px solid #f8c471;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-bottom p {
  margin: 0;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
