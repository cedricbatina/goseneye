<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">
      <span v-if="!isSmallScreen">Précédent</span>
      <span v-else>&lt;</span>
    </button>
    <span class="page-info">Page {{ currentPage }} sur {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">
      <span v-if="!isSmallScreen">Suivant</span>
      <span v-else>&gt;</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});

const emit = defineEmits(["updatePage"]);

const isSmallScreen = ref(false);

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth <= 600;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit("updatePage", props.currentPage + 1);
    console.log("Page suivante : ", props.currentPage + 1); // Log pour vérifier les pages
  }
};

const prevPage = () => {
  if (props.currentPage > 1) {
    emit("updatePage", props.currentPage - 1);
    console.log("Page précédente : ", props.currentPage - 1); // Log pour vérifier les pages
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: #f8c471;
}

button {
  background-color: #f8c471;
  border: 2px solid transparent;
  padding: 10px 20px;
  cursor: pointer;
  margin: 5px;
  color: #000;
  font-family: "Montserrat", sans-serif;
  border-radius: 5px;
  transition: background-color 0.3s ease, border-color 0.3s ease,
    color 0.3s ease;
}

button:hover:enabled {
  background-color: #f8a471;
  border-color: #f8c471;
  color: #000;
}

button:disabled {
  background-color: #555;
  border-color: #333;
  cursor: not-allowed;
}

.page-info {
  margin: 0 10px;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}

@media (max-width: 600px) {
  .pagination {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  button {
    padding: 8px 12px;
    margin: 5px;
  }
}
</style>
