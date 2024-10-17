<template>
  <div v-if="isAdmin" class="admin-buttons">
    <nuxt-link :to="`/admin/`" class="btn-admin btn-outline">
      <i class="fas fa-tachometer-alt"></i> Admin Board
    </nuxt-link>
    <nuxt-link
      :to="`/admin/video/edit/${videoId}`"
      class="btn-admin btn-outline"
    >
      <i class="fas fa-edit"></i> Modifier
    </nuxt-link>
    <nuxt-link
      :to="`/admin/video/delete/${videoId}`"
      class="btn-admin btn-outline btn-delete"
    >
      <i class="fas fa-trash-alt"></i> Supprimer
    </nuxt-link>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/authStore";

const authStore = useAuthStore();
const isAdmin = computed(() => authStore.user && authStore.user.role_id === 1);
</script>

<style scoped>
/* Flexbox pour disposer les boutons à droite */
.admin-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

/* Style commun pour tous les boutons d'admin */
.btn-admin {
  padding: 10px 20px;
  background-color: transparent; /* Fond transparent */
  color: #f8c471; /* Texte doré */
  font-weight: bold;
  border-radius: 5px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 2px solid #f8c471; /* Bordure dorée */
  transition: background-color 0.3s ease, transform 0.2s, border-color 0.3s ease;
  font-size: 16px;
  cursor: pointer;
}

/* Hover effect pour un léger changement de couleur et de bordure */
.btn-admin:hover {
  background-color: rgba(248, 196, 113, 0.1); /* Fond doré très léger */
  transform: scale(1.05); /* Zoom léger au survol */
  border-color: #cda85b; /* Bordure dorée plus foncée */
}

/* Icônes avec espacement */
.btn-admin i {
  margin-right: 5px;
}

/* Bouton Supprimer avec couleur spéciale */
.btn-delete {
  border-color: #e74c3c; /* Rouge pour supprimer */
  color: #e74c3c;
}

/* Hover spécifique pour le bouton Supprimer */
.btn-delete:hover {
  background-color: rgba(231, 76, 60, 0.1); /* Fond rouge très léger */
  border-color: #c0392b; /* Bordure rouge foncée */
}
</style>
