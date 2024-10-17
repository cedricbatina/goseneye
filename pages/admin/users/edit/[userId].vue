
<template>
  <div class="homepage-container">
    <div class="edit-user-page">
      <EditUser />
    </div>
  </div>
</template>

<style scoped>
.edit-user-page {
  padding: 50px;
  background-color: #000; /* Fond noir */
  color: #f8c471; /* Texte doré */
  min-height: 100vh; /* Assurer que la page occupe toute la hauteur */
}

/* Responsive design for different screen sizes */
@media (max-width: 768px) {
  .edit-user-page {
    padding: 30px;
  }
}

@media (max-width: 480px) {
  .edit-user-page {
    padding: 20px;
  }
}
</style>
