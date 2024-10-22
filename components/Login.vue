<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="loginUser">
      <!-- Champ Email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>

      <!-- Champ Mot de passe avec option pour afficher/masquer -->
      <div class="form-group password-group">
        <label for="password">Mot de passe</label>
        <div class="password-wrapper">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            required
          />
          <button
            type="button"
            class="toggle-password"
            @click="togglePasswordVisibility"
            aria-label="Afficher ou masquer le mot de passe"
          >
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
      </div>

      <!-- Bouton Se connecter -->
      <button type="submit" class="btn">Se connecter</button>
    </form>

    <!-- Message de confirmation ou d'erreur -->
    <div v-if="message" :class="['message-box', messageType]">
      {{ message }}
    </div>

    <!-- Redirection pour s'inscrire -->
    <p class="redirect">
      Pas encore de compte ? <nuxt-link to="/register">S'inscrire</nuxt-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/store/authStore";

// Données du formulaire
const email = ref("");
const password = ref("");
const message = ref("");
const messageType = ref("");
const showPassword = ref(false); // Pour afficher/masquer le mot de passe

// Utilisation du routeur
const router = useRouter();
const authStore = useAuthStore();

// Fonction pour gérer la connexion de l'utilisateur
const loginUser = async () => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();
    if (data.error) {
      // Afficher le message d'erreur
      message.value = data.error;
      messageType.value = "error";
    } else {
      // Stocker les informations de l'utilisateur dans le store (id, role_id)
      authStore.user = data.user;
      authStore.token = data.token;

      // Afficher le message de succès
      message.value = "Connexion réussie !";
      messageType.value = "success";

      // Redirection en fonction du rôle de l'utilisateur
      setTimeout(() => {
        if (authStore.user.role_id === 1) {
          router.push("/admin");
        } else {
          router.push("/user/profile");
        }
      }, 1500); // Attendre 1,5s avant de rediriger
    }
  } catch (error) {
    message.value = "Erreur lors de la connexion";
    messageType.value = "error";
  }
};

// Fonction pour afficher/masquer le mot de passe
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 40px;
  background-color: #000;
  border: 2px solid #f8c471;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  color: #f8c471;
  font-family: "Montserrat", sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #f8c471;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #f8c471;
  text-transform: uppercase;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid #f8c471;
  background-color: #333;
  color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 16px;
  transition: all 0.3s ease;
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
  cursor: pointer;
  color: #000;
}

.toggle-password i {
  font-size: 18px;
}

.form-group input:focus {
  outline: none;
  border-color: #ffd700;
  background-color: #444;
}

.btn {
  width: 100%;
  padding: 14px;
  background-color: #f8c471;
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn:hover {
  background-color: #cda85b;
  transform: scale(1.05);
}

.message-box {
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
}

.success {
  background-color: #d4edda;
  color: #155724;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
}

.redirect {
  text-align: center;
  margin-top: 30px;
  font-size: 14px;
  color: #f8c471;
}

.redirect a {
  color: #f8c471;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.redirect a:hover {
  color: #cda85b;
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
  .login-container {
    padding: 30px;
  }

  .btn {
    font-size: 14px;
  }

  h2 {
    font-size: 22px;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 20px;
  }

  h2 {
    font-size: 20px;
  }

  .btn {
    font-size: 14px;
  }
}
</style>
