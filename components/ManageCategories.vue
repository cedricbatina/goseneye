<template>
  <div class="homepage-container">
    <div class="manage-categories">
      <h1 class="mb-5">Gestion des Catégories</h1>

      <!-- Boutons de navigation -->
      <div class="button-group mb-5">
        <button @click="toggleAddCategoryForm" class="btn btn-add">
          <i class="fas fa-plus"></i> Ajouter une catégorie
        </button>
        <nuxt-link to="/admin/video/create-video" class="btn btn-nav">
          <i class="fas fa-video"></i> Créer une vidéo
        </nuxt-link>
        <nuxt-link to="/admin/video/manage-videos" class="btn btn-nav">
          <i class="fas fa-film"></i> Gérer les vidéos
        </nuxt-link>
        <nuxt-link to="/admin/users" class="btn btn-nav">
          <i class="fas fa-users"></i> Gérer les utilisateurs
        </nuxt-link>
        <nuxt-link to="/admin" class="btn btn-nav">
          <i class="fas fa-home"></i> Retour à Admin Board
        </nuxt-link>
      </div>

      <!-- Notification de succès ou d'erreur -->
      <div v-if="message" class="notification" :class="messageType">
        {{ message }}
      </div>

      <!-- Formulaire d'ajout d'une nouvelle catégorie -->
      <transition name="fade">
        <div v-if="showAddCategoryForm" class="category-form">
          <h4>Ajouter une nouvelle catégorie</h4>
          <input
            v-model="newCategory.name"
            type="text"
            placeholder="Nom de la catégorie"
            class="category-input"
          />
          <button @click="addCategory" class="btn-save">Enregistrer</button>
        </div>
      </transition>

      <!-- Liste des catégories existantes -->
      <div
        v-if="categories.length > 0"
        class="category-list table-responsive-custom"
      >
        <table class="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom de la Catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.slug">
              <td>{{ category.id }}</td>
              <td>{{ category.name }}</td>
              <td>
                <button @click="editCategory(category)" class="btn-edit">
                  Modifier
                </button>
                <button
                  @click="openDeleteModal(category.slug)"
                  class="btn-delete"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else>
        <p>Aucune catégorie trouvée.</p>
      </div>

      <!-- Formulaire de modification d'une catégorie -->
      <transition name="fade">
        <div v-if="editingCategory" class="category-form">
          <h4>Modifier la catégorie</h4>
          <input
            v-model="editingCategory.name"
            type="text"
            placeholder="Nom de la catégorie"
            class="category-input"
          />
          <button @click="updateCategory" class="btn-save">
            Enregistrer les modifications
          </button>
        </div>
      </transition>

      <!-- Boîte modale pour confirmer la suppression -->
      <transition name="fade">
        <div v-if="confirmDeleteSlug" class="delete-confirmation">
          <p>Êtes-vous sûr de vouloir supprimer cette catégorie ?</p>
          <button @click="finalizeDelete" class="btn-confirm">Oui</button>
          <button @click="cancelDelete" class="btn-cancel">Annuler</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const categories = ref([]);
const showAddCategoryForm = ref(false);
const newCategory = ref({ name: "" });
const editingCategory = ref(null);
const message = ref(null);
const messageType = ref("");
const confirmDeleteSlug = ref(null);

// Fonction pour basculer l'affichage du formulaire d'ajout
const toggleAddCategoryForm = () => {
  showAddCategoryForm.value = !showAddCategoryForm.value;
};

// Fonction pour récupérer la liste des catégories depuis l'API
const fetchCategories = async () => {
  try {
    const response = await fetch("/api/get-categories");
    const data = await response.json();
    if (data.categories) {
      categories.value = data.categories;
    } else {
      showMessage("Erreur lors du chargement des catégories", "error");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error);
    showMessage("Erreur lors de la récupération des catégories", "error");
  }
};

const addCategory = async () => {
  try {
    const response = await fetch("/api/categories/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory.value),
    });

    const data = await response.json();

    // Condition ajustée pour correspondre à la structure des retours de l'API
    if (response.ok && data.categoryId) {
      fetchCategories(); // Actualiser la liste après l'ajout
      newCategory.value.name = ""; // Réinitialiser le formulaire
      showAddCategoryForm.value = false;
      showMessage("Catégorie ajoutée avec succès", "success");
    } else {
      showMessage(
        data.error || "Erreur lors de l'ajout de la catégorie",
        "error"
      );
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de la catégorie", error);
    showMessage("Erreur lors de l'ajout de la catégorie", "error");
  }
};

// Fonction pour éditer une catégorie
const editCategory = (category) => {
  editingCategory.value = { ...category };
};

// Fonction pour mettre à jour une catégorie existante via le slug
const updateCategory = async () => {
  try {
    const response = await fetch(
      `/api/categories/update/${editingCategory.value.slug}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCategory.value),
      }
    );
    const data = await response.json();
    if (response.ok && data.success) {
      fetchCategories(); // Actualiser la liste après modification
      editingCategory.value = null;
      showMessage("Catégorie mise à jour avec succès", "success");
    } else {
      showMessage(
        data.error || "Erreur lors de la mise à jour de la catégorie",
        "error"
      );
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la catégorie", error);
    showMessage("Erreur lors de la mise à jour de la catégorie", "error");
  }
};

// Fonction pour ouvrir la boîte de dialogue pour confirmer la suppression
const openDeleteModal = (slug) => {
  confirmDeleteSlug.value = slug;
};

// Fonction pour annuler la suppression
const cancelDelete = () => {
  confirmDeleteSlug.value = null;
};

// Fonction pour finaliser la suppression après confirmation
const finalizeDelete = async () => {
  if (!confirmDeleteSlug.value) return;
  try {
    const response = await fetch(
      `/api/categories/delete/${confirmDeleteSlug.value}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      fetchCategories(); // Actualiser la liste après suppression
      confirmDeleteSlug.value = null;
      showMessage("Catégorie supprimée avec succès", "success");
    } else {
      showMessage(
        data.error || "Erreur lors de la suppression de la catégorie",
        "error"
      );
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la catégorie", error);
    showMessage("Erreur lors de la suppression de la catégorie", "error");
  }
};

// Fonction pour afficher les messages de succès ou d'erreur
const showMessage = (msg, type) => {
  message.value = msg;
  messageType.value = type;
  setTimeout(() => {
    message.value = null;
  }, 3000); // Le message disparaît après 3 secondes
};

// Charger les catégories au montage du composant
onMounted(() => {
  fetchCategories();
});
</script>
<style scoped>
.delete-confirmation {
  background-color: #000; /* Fond noir */
  padding: 20px;
  border-radius: 10px;
  color: #f8c471; /* Texte doré */
  text-align: center;
}

.btn-confirm {
  background-color: #f8c471; /* Doré */
  padding: 10px 20px;
  color: #000; /* Texte noir */
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-confirm:hover {
  background-color: #cda85b; /* Doré plus foncé au survol */
}

.btn-cancel {
  background-color: #f8c471; /* Doré */
  padding: 10px 20px;
  color: #000; /* Texte noir */
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s ease;
}

.btn-cancel:hover {
  background-color: #333; /* Fond plus sombre au survol */
}

.manage-categories {
  padding: 50px;
  text-align: center;
  background-color: #000;
  color: #f8c471;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.btn {
  background-color: #000;
  color: #f8c471;
  padding: 10px 20px;
  border: 1px solid #f8c471;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #f8c471;
  color: #000;
}

.btn i {
  margin-right: 8px;
}

.notification {
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
  width: 80%;
  margin: 0 auto;
}

.notification.success {
  background-color: #4caf50;
  color: white;
}

.notification.error {
  background-color: #f44336;
  color: white;
}

.category-form {
  margin-top: 30px;
}

.category-input {
  padding: 10px;
  margin-right: 10px;
  width: 300px;
}

.btn-save {
  background-color: #f8c471;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #000;
}

.btn-save:hover {
  background-color: #cda85b;
}

/* Style pour rendre la table responsive */
.table-responsive-custom {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #111;
  color: #f8c471;
}

th,
td {
  padding: 15px;
  border: 1px solid #f8c471;
  white-space: nowrap;
}

th {
  background-color: #000;
  color: #f8c471;
}

td {
  background-color: #333;
  color: #f8c471;
}

/* Styles pour les boutons Modifier et Supprimer dans les tableaux */
.btn-edit,
.btn-delete {
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-edit {
  background-color: #f8c471;
  color: #000;
  margin-right: 10px;
}

.btn-delete {
  background-color: #f00;
  color: #fff;
}

.btn-edit:hover {
  background-color: #cda85b;
}

.btn-delete:hover {
  background-color: #d00;
}

/* Icônes pour petits écrans */
.btn-edit-icon,
.btn-delete-icon {
  display: none;
  background-color: #f8c471;
  color: #000;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-delete-icon {
  background-color: #f00;
  color: #fff;
}

.btn-edit-icon:hover,
.btn-delete-icon:hover {
  background-color: #cda85b;
}

.btn-delete-icon:hover {
  background-color: #d00;
}

@media (max-width: 768px) {
  .btn-edit,
  .btn-delete {
    display: none;
  }

  .btn-edit-icon,
  .btn-delete-icon {
    display: inline-block;
  }
}
</style>
