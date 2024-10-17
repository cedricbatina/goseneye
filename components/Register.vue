<template>
  <div class="register-container">
    <h2>Inscription</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input
          v-model="username"
          type="text"
          id="username"
          class="form-control"
          placeholder="Entrez votre nom d'utilisateur"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="form-control"
          placeholder="Entrez votre email"
          required
        />
      </div>

      <!-- Champ mot de passe avec option pour afficher/masquer -->
      <div class="form-group password-group">
        <label for="password">Mot de passe</label>
        <div class="password-wrapper">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            class="form-control"
            placeholder="Entrez votre mot de passe"
            required
          />
          <button
            type="button"
            class="toggle-password"
            @click="togglePassword"
            aria-label="Afficher ou masquer le mot de passe"
          >
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
      </div>

      <div class="form-group password-group">
        <label for="confirmPassword">Confirmez le mot de passe</label>
        <div class="password-wrapper">
          <input
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            id="confirmPassword"
            class="form-control"
            placeholder="Confirmez votre mot de passe"
            required
          />
          <button
            type="button"
            class="toggle-password"
            @click="toggleConfirmPassword"
            aria-label="Afficher ou masquer la confirmation du mot de passe"
          >
            <i
              :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
            ></i>
          </button>
        </div>
      </div>

      <button type="submit" class="btn btn-register">S'inscrire</button>
    </form>

    <!-- Affichage du message de succès ou d'erreur -->
    <div v-if="message" :class="['message-box', messageType]">
      {{ message }}
    </div>

    <p class="redirect">
      Déjà un compte ? <nuxt-link to="/login">Se connecter</nuxt-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Variables réactives pour les champs et les messages
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const message = ref(""); // Message de confirmation ou d'erreur
const messageType = ref(""); // "success" ou "error"

const router = useRouter();

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

// Fonction pour gérer l'inscription de l'utilisateur
const registerUser = async () => {
  if (password.value !== confirmPassword.value) {
    message.value = "Les mots de passe ne correspondent pas.";
    messageType.value = "error";
    return;
  }

  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value,
    }),
  });

  const data = await response.json();
  if (data.error) {
    message.value = data.error;
    messageType.value = "error";
  } else {
    message.value =
      "Inscription réussie ! Redirection vers la page de connexion...";
    messageType.value = "success";
    setTimeout(() => {
      router.push("/login");
    }, 1500); // Attendre 1.5 seconde avant de rediriger
  }
};
</script>


<style scoped>
.register-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #000; /* Fond noir */
  color: #f8c471; /* Texte doré */
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #f8c471; /* Texte doré */
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #f8c471; /* Bordure dorée */
  background-color: #333; /* Fond sombre */
  color: #f8c471; /* Texte doré */
  border-radius: 5px;
}

.form-control::placeholder {
  color: #aaa;
}

.password-group {
  position: relative;
}

.password-wrapper {
  position: relative;
  display: flex;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #000;
  cursor: pointer;
}

.toggle-password i {
  font-size: 18px;
}

.btn {
  width: 100%;
  padding: 10px;
  background-color: #f8c471;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.btn:hover {
  background-color: #cda85b;
}

.redirect {
  text-align: center;
  margin-top: 20px;
}

/* Styles pour les messages de confirmation ou d'erreur */
.message-box {
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

.success {
  background-color: #d4edda;
  color: #155724;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
}

/* Style pour la redirection */
.redirect {
  text-align: center;
  margin-top: 20px;
}

.redirect a {
  color: #f8c471; /* Texte doré */
  text-decoration: none;
  font-weight: bold;
}

.redirect a:hover {
  color: #cda85b;
  text-decoration: underline;
}

/* Responsive design */
@media (max-width: 768px) {
  .register-container {
    padding: 15px;
    margin: 20px auto;
  }

  .form-control {
    font-size: 14px;
    padding: 8px;
  }
}
</style>
