<template>
  <div class="manage-users">
    <h3 class="mb-3">Gérer les Utilisateurs</h3>

    <AdminButtons />

    <!-- Tableau des utilisateurs -->
    <div v-if="users.length > 0" class="user-list">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th class="role-column">Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td class="role-column">
              {{ user.role_id === 1 ? "Admin" : "Utilisateur" }}
            </td>
            <td>
              <!-- Icônes Modifier et Supprimer pour petits écrans -->
              <nuxt-link
                :to="`/admin/users/edit/${user.id}`"
                class="btn-edit-icon d-inline-block d-md-none"
              >
                <i class="fas fa-edit"></i>
              </nuxt-link>
              <button
                @click="confirmDelete(user.id)"
                class="btn-delete-icon d-inline-block d-md-none"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
              <!-- Boutons Modifier et Supprimer pour grands écrans -->
              <nuxt-link
                :to="`/admin/users/edit/${user.id}`"
                class="btn-edit d-none d-md-inline-block"
              >
                Modifier
              </nuxt-link>
              <button
                @click="confirmDelete(user.id)"
                class="btn-delete d-none d-md-inline-block"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Aucun utilisateur trouvé.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useHead } from "#imports"; // SEO integration

const users = ref([]);

// Fonction pour récupérer la liste des utilisateurs
const fetchUsers = async () => {
  try {
    const response = await fetch("/api/get-users");
    const data = await response.json();
    users.value = data.users;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs", error);
  }
};

// Fonction pour confirmer la suppression d'un utilisateur
const confirmDelete = async (userId) => {
  const isConfirmed = confirm(
    "Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
  );
  if (isConfirmed) {
    deleteUser(userId);
  }
};

// Fonction pour supprimer un utilisateur
const deleteUser = async (userId) => {
  try {
    await fetch(`/api/delete-user/${userId}`, {
      method: "DELETE",
    });
    fetchUsers();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur", error);
  }
};

onMounted(() => {
  fetchUsers();
});

// SEO - Définir les balises head et JSON-LD pour les moteurs de recherche
useHead({
  title: "Gestion des utilisateurs - Admin",
  meta: [
    {
      name: "description",
      content:
        "Page de gestion des utilisateurs pour ajouter, modifier ou supprimer des utilisateurs du site Gosen Eye.",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Gestion des utilisateurs - Admin",
        description:
          "Page de gestion des utilisateurs pour gérer les utilisateurs enregistrés sur le site Gosen Eye.",
      }),
    },
  ],
});
</script>

<style scoped>
.manage-users {
  padding: 50px;
  text-align: center;
  background-color: #000;
  color: #f8c471;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #111;
  color: #f8c471;
}

/* Style des en-têtes */
th,
td {
  padding: 15px;
  border: 1px solid #f8c471;
  text-align: left;
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

/* Cacher la colonne "Rôle" et les boutons textes sur petits écrans */
.role-column,
.btn-edit,
.btn-delete {
  display: none;
}

/* Afficher icônes pour Modifier et Supprimer sur petits écrans */
.btn-edit-icon,
.btn-delete-icon {
  display: inline-block;
  padding: 8px 12px;
  color: #f8c471;
  cursor: pointer;
}

.btn-edit-icon:hover,
.btn-delete-icon:hover {
  color: #000;
}

.btn-delete-icon {
  background-color: #f00;
}

.btn-delete-icon:hover {
  color: #fff;
}

.btn-edit-icon {
  background-color: #f8c471;
  color: #000;
  margin-right: 10px;
}

/* Cacher les icônes sur les grands écrans */
@media (min-width: 768px) {
  .btn-edit-icon,
  .btn-delete-icon {
    display: none;
  }

  /* Afficher la colonne "Rôle" et les boutons Modifier/Supprimer sur grands écrans */
  .role-column,
  .btn-edit,
  .btn-delete {
    display: inline-block;
  }
}

@media (max-width: 768px) {
  /* Transformer le tableau en bloc sur petits écrans */
  table {
    display: block;
    width: 100%;
    overflow-x: auto;
  }

  th,
  td {
    white-space: nowrap;
    padding: 10px;
    font-size: 14px;
  }

  /* Styles pour les boutons Modifier et Supprimer dans les tableaux */
  .btn-edit,
  .btn-delete {
    padding: 8px 12px;
    border-radius: 5px; /* Bordure arrondie pour tous */
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn-edit {
    background-color: #f8c471; /* Fond doré */
    color: #000; /* Texte noir */
    margin-right: 10px;
  }

  .btn-delete {
    background-color: #f00; /* Fond rouge */
    color: #fff; /* Texte blanc */
  }

  .btn-edit:hover {
    background-color: #cda85b; /* Fond doré plus foncé */
  }

  .btn-delete:hover {
    background-color: #d00; /* Fond rouge plus foncé */
  }

  /* Icônes pour petits écrans */
  .btn-edit-icon,
  .btn-delete-icon {
    display: none;
    background-color: #f8c471; /* Fond doré pour Modifier */
    color: #000; /* Texte noir */
    padding: 8px; /* Taille égale pour les icônes */
    border-radius: 5px; /* Forme arrondie pour les icônes */
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn-delete-icon {
    background-color: #f00; /* Fond rouge pour Supprimer */
    color: #fff;
  }

  .btn-edit-icon:hover,
  .btn-delete-icon:hover {
    background-color: #cda85b; /* Changement de couleur au survol pour Modifier */
  }

  .btn-delete-icon:hover {
    background-color: #d00; /* Changement de couleur au survol pour Supprimer */
  }

  .btn-nav {
    font-size: 14px;
    padding: 8px 12px;
  }
}

@media (max-width: 480px) {
  th,
  td {
    font-size: 12px;
    padding: 8px;
  }

  .btn-edit,
  .btn-delete {
    display: none; /* Cacher les boutons texte */
  }

  .btn-edit-icon,
  .btn-delete-icon {
    display: inline-block; /* Afficher les icônes */
  }

  .btn-nav {
    font-size: 12px;
    padding: 6px 10px;
  }
}
</style>
