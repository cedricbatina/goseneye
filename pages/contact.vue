<template>
  <div class="contact-container">
    <h1 class="page-title m-3">Réalisons votre vision!</h1>

    <div class="contact-page">
      <div class="signature-wrapper">
        <Signature />
      </div>

      <div class="form-wrapper container mt-4">
        <p class="intro-text">
          Vous avez un projet vidéo en tête ? Vous souhaitez collaborer avec
          nous ou obtenir plus d'informations sur nos services ? N'hésitez pas à
          nous contacter en remplissant le formulaire ci-dessous. Nous serons
          ravis de vous répondre dans les plus brefs délais.
        </p>

        <h4 class="form-title text-center">Formulaire de contact</h4>

        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-group">
            <label for="name">Nom :</label>
            <input
              type="text"
              v-model="form.name"
              id="name"
              class="form-control"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Email :</label>
            <input
              type="email"
              v-model="form.email"
              id="email"
              class="form-control"
              required
            />
          </div>

          <div class="form-group">
            <label for="message">Message :</label>
            <textarea
              v-model="form.message"
              id="message"
              class="form-control"
              rows="5"
              required
            ></textarea>
          </div>

          <button type="submit" class="btn-submit">Envoyer</button>
        </form>

        <!-- Messages de succès ou d'erreur -->
        <p v-if="successMessage" class="success-message">
          {{ successMessage }}
        </p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>

      <p class="closing-text text-center">
        Merci de votre visite sur notre site. Si vous avez des questions ou
        souhaitez discuter de votre projet, notre équipe est à votre écoute.
        Nous sommes impatients de vous rencontrer et de créer avec vous des
        vidéos qui surpassent vos attentes.
      </p>
    </div>
    <CategoryVideoButtons />
    <AdminButtons />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "#imports";

const form = ref({
  name: "",
  email: "",
  message: "",
});

const successMessage = ref("");
const errorMessage = ref("");

const submitForm = async () => {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.value),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi du message");
    }

    successMessage.value = "Message envoyé avec succès !";
    errorMessage.value = "";
    form.value = {
      name: "",
      email: "",
      message: "",
    };
  } catch (error) {
    console.error(error);
    successMessage.value = "";
    errorMessage.value = "Il y a eu un problème lors de l'envoi du message.";
  }
};

useHead(() => {
  const title = "Contact - Gosen'Eye | Réalisons votre vision";
  const description =
    "Vous avez un projet vidéo en tête ? Contactez Gosen'Eye pour discuter de vos idées et obtenir un devis personnalisé. Nous sommes impatients de collaborer avec vous.";

  return {
    title,
    meta: [
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "contact, vidéaste, professionnel, vidéo, Gosen'Eye, Bordeaux, projet, devis, collaboration",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.goseneye.com/contact" },
      {
        property: "og:image",
        content: "https://www.goseneye.com/public/images/signature.png",
      },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: "https://www.goseneye.com/public/images/signature.png",
      },
    ],
  };
});
</script>

<style scoped>
.contact-container {
  padding: 50px 0;
  background-color: #000;
  color: #f8c471;
}

.signature-wrapper {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.form-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  font-size: 2.5em;
  text-align: center;
  color: #f8c471;
  margin-bottom: 20px;
}

.intro-text,
.closing-text {
  text-align: center;
  margin: 40px 20px;
  line-height: 1.6;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group label {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.form-control {
  padding: 12px;
  font-size: 1.1em;
  border: 1px solid #f8c471;
  background-color: #333;
  color: #f8c471;
  border-radius: 8px;
  width: 100%;
}

.form-control:focus {
  outline: none;
  border-color: #f8a471;
}

.btn-submit {
  padding: 15px 30px;
  background-color: #f8c471;
  color: #000;
  font-size: 1.2em;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  align-self: center;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #f8a471;
}

.success-message {
  color: #28a745;
  text-align: center;
  margin-top: 20px;
}

.error-message {
  color: #dc3545;
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .form-wrapper {
    padding: 10px;
  }

  .form-control {
    font-size: 1em;
  }

  .page-title {
    font-size: 2em;
  }
}

@media (max-width: 480px) {
  .form-control {
    font-size: 0.9em;
  }

  .btn-submit {
    padding: 10px 20px;
    font-size: 1em;
  }
}
</style>
