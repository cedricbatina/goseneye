<template>
  <div class="image-container m-5">
    <img
      src="/images/signature.png"
      alt="Carte de visite de Gosen'eye"
      class="signature-image"
    />
  </div>
</template>

<style scoped>
.image-container {
  display: flex;
  justify-content: center; /* Centre l'image horizontalement */
  align-items: center; /* Centre l'image verticalement si nécessaire */
}

.signature-image {
  width: 50%; /* Taille initiale de l'image */
  transform: scale(2); /* Augmente la taille de 1,5 fois */
  margin: 40px;
}
</style>
