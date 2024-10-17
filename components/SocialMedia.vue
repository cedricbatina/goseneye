<template>
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
</template>

<script setup>
const links = {
  linkedin: "https://www.linkedin.com/in/alpha-gosen-eye/",
  instagram: "https://www.instagram.com/gosen_eye/",
  facebook: "https://www.facebook.com/Gosen.Eye/",
  googleMaps:
    "https://www.google.com/maps/place/Gosen'Eye+-+Production+vid%C3%A9os+Bordeaux/@44.899385,-0.4729274,9z/data=!3m1!4b1!4m6!3m5!1s0xd55297fcddf5373:0xc8cd2a8600691d74!8m2!3d44.899385!4d-0.4729274!16s%2Fg%2F11pxx739_0?entry=ttu&g_ep=EgoyMDI0MTAwOS4wIKXMDSoASAFQAw%3D%3D", // Remplacez par le lien correct
};
</script>

<style scoped>
.social-media {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

.social-media a {
  color: #f8c471;
  font-size: 24px;
  transition: color 0.3s;
}

.social-media a:hover {
  color: #f8a471;
}
</style>
