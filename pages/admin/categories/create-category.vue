<template>
  <div class="create-category">
    <h3>Ajouter une Catégorie</h3>
    <form @submit.prevent="addCategory">
      <div class="form-group">
        <label for="category-name">Nom de la catégorie :</label>
        <input
          type="text"
          id="category-name"
          v-model="newCategory.name"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn-create">Ajouter la catégorie</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const newCategory = ref({
  name: "",
});

// Fonction pour ajouter une nouvelle catégorie
const addCategory = async () => {
  try {
    const response = await fetch("/api/create-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory.value),
    });

    if (response.ok) {
      alert("Catégorie ajoutée avec succès");
      router.push("/admin/categories");
    } else {
      const errorData = await response.json();
      console.error("Erreur lors de l'ajout :", errorData.message);
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de la catégorie", error);
  }
};
</script>

<style scoped>
.create-category {
  padding: 50px;
  text-align: center;
  background-color: #000;
  color: #f8c471;
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
}

.btn-create {
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

.btn-create:hover {
  background-color: #cda85b;
}
</style>
