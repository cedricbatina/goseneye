<template>
  <div class="edit-category">
    <h3>Modifier la Catégorie</h3>
    <form @submit.prevent="updateCategory">
      <div class="form-group">
        <label for="category-name">Nom de la catégorie :</label>
        <input
          type="text"
          id="category-name"
          v-model="category.name"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn-update">Mettre à jour</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import slugify from "slugify"; // Importation pour générer le slug

// Appliquer le middleware à cette page
definePageMeta({
  middleware: "auth", // Utilisation du middleware "auth"
  requiresAdmin: true, // Cette page nécessite un accès administrateur
});

const route = useRoute();
const router = useRouter();
const category = ref({});

// Récupération de la catégorie via son slug
const fetchCategory = async () => {
  const slug = route.params.slug;
  try {
    const response = await fetch(`/api/get-category-by-slug/${slug}`);
    const data = await response.json();
    if (response.ok && data.category) {
      category.value = data.category;
    } else {
      console.error("Erreur lors de la récupération de la catégorie :", data);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la catégorie", error);
  }
};

// Fonction pour mettre à jour la catégorie
const updateCategory = async () => {
  const newSlug = slugify(category.value.name, { lower: true });
  try {
    const response = await fetch(`/api/categories/update/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: category.value.name, slug: newSlug }),
    });

    if (response.ok) {
      alert("Catégorie mise à jour avec succès");
      router.push("/admin/categories");
    } else {
      const errorData = await response.json();
      console.error("Erreur lors de la mise à jour :", errorData.message);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la catégorie", error);
  }
};

onMounted(() => {
  fetchCategory();
});
</script>

<style scoped>
.edit-category {
  padding: 50px;
  text-align: center;
  background-color: #000;
  color: #f8c471;
  min-height: 100vh;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid #f8c471;
  background-color: #222;
  color: #f8c471;
}

.btn-update {
  padding: 10px 20px;
  background-color: #f8c471;
  color: #000;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-update:hover {
  background-color: #cda85b;
}

@media (max-width: 768px) {
  .edit-category {
    padding: 20px;
  }

  .form-control {
    max-width: 100%;
  }
}
</style>
