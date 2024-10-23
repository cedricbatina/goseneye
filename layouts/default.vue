<template>
  <div class="homepage-container">
    <!-- Barre supérieure avec téléphone, email et réseaux sociaux -->
    <div
      class="top-bar d-flex justify-content-between align-items-center p-2 bg-black text-white"
    >
      <!-- Section gauche avec téléphone -->
      <div class="contact-info d-flex align-items-center">
        <i class="fas fa-phone mr-2"></i>
        <span class="contact-text">+33 6 64 53 85 26</span>
      </div>

      <!-- Section du milieu avec les réseaux sociaux -->
      <div class="social-media">
        <SocialMedia />
      </div>

      <!-- Section droite avec email -->
      <div class="contact-info d-flex align-items-center">
        <i class="fas fa-envelope mr-2"></i>
        <span class="contact-text">gosen.eye@gmail.com</span>
      </div>
    </div>

    <!-- Navbar et contenu principal -->
    <Navbar />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";
import SocialMedia from "~/components/SocialMedia.vue"; // Importer SocialMedia

export default {
  components: {
    Navbar,
    Footer,
    SocialMedia, // Ajouter SocialMedia dans les composants
  },
};
</script>

<style scoped>
@import "@/assets/css/footer-style.css";

/* Styles pour la top-bar */
.top-bar {
  background-color: #000;
  color: #f1f1f1;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

/* Icônes de la barre supérieure */
.fas {
  color: #f8c471;
}

/* Espacement entre icône et texte */
.contact-info i {
  margin-right: 5px;
}

.contact-text {
  font-size: 14px;
}

/* Social Media styles */
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
  color: #d4ac0d;
}

/* Responsive Design */

/* Pour les écrans de moins de 768px (tablettes et mobiles) */
@media (max-width: 768px) {
  .top-bar {
    flex-direction: column;
    text-align: center;
    padding: 10px 0;
  }

  .contact-info {
    margin-bottom: 5px;
  }

  .contact-text {
    font-size: 13px;
  }

  .social-media {
    margin: 10px 0;
  }
}

/* Pour les écrans de moins de 576px (mobiles) */
@media (max-width: 576px) {
  .top-bar {
    font-size: 14px;
  }

  .contact-info {
    font-size: 12px;
  }

  .contact-text {
    font-size: 12px;
  }

  .social-media a {
    font-size: 20px;
  }
}
</style>
