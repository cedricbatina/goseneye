import { eventHandler, readBody, sendError } from "h3";
import nodemailer from "nodemailer";

export default eventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, email, message } = body;

    // Vérifiez si EMAIL_TO est défini
    if (!process.env.EMAIL_TO) {
      throw new Error(
        "L'adresse e-mail de destination (EMAIL_TO) n'est pas définie"
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER, // Identifiant SMTP
        pass: process.env.SMTP_PASS, // Mot de passe SMTP
      },
      debug: true, // active le debug
      logger: true, // active les logs
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM, // Votre adresse e-mail vérifiée
      to: process.env.EMAIL_TO, // L'adresse e-mail qui recevra les messages
      subject: "Nouveau message de votre site web",
      text: `Vous avez reçu un nouveau message de ${name} (${email}):\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Email envoyé avec succès !",
    };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail:", error);
    return sendError(event, {
      statusCode: 500,
      statusMessage: "Erreur lors de l'envoi de l'e-mail.",
      message: error.message,
    });
  }
});
