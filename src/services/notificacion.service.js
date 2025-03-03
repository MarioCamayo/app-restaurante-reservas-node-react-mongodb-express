import dotenv from "dotenv";
dotenv.config();
import twilio from "twilio";


const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const enviarNotificacionReservaSMS = async (numeroDestino, mensaje) => {
  try {

    // Verificar si el número ya tiene el prefijo "+51"
    if (!numeroDestino.startsWith("+51")) {
      numeroDestino = `+51${numeroDestino}`;
    }

    const response = await client.messages.create({
      body: mensaje,
      from: process.env.TWILIO_PHONE_NUMBER, // Número de Twilio
      to: numeroDestino, // Número del usuario
    });

    console.log("SMS enviado con éxito:", response.sid);
    console.log("TWILIO_ACCOUNT_SID:", process.env.TWILIO_ACCOUNT_SID);
    console.log("TWILIO_AUTH_TOKEN:", process.env.TWILIO_AUTH_TOKEN);
    console.log("TWILIO_PHONE_NUMBER:", process.env.TWILIO_PHONE_NUMBER);

    return response;
  } catch (error) {
    console.error("Error al enviar SMS:", error);
    throw new Error("No se pudo enviar la notificación por SMS.");
  }
};


















































// Tus credenciales de Twilio
// const accountSid = "TU_ACCOUNT_SID";
// const accountSid = "";
// const authToken = "TU_AUTH_TOKEN";
// const authToken = ""
// const twilioClient = twilio(accountSid, authToken);

// Enviar notificación por WhatsApp
// export const enviarWhatsApp = async (reserva) => {
//   const { telefono, nombreCliente, fecha, hora, mesa } = reserva;

//   try {
//     const message = await twilioClient.messages.create({
//       from: "whatsapp:", // Número de Twilio (sandbox)
//       to: `whatsapp:+51${telefono}`, // Número del usuario (ejemplo para Perú)
//       body: `Hola ${nombreCliente}, tu reserva ha sido confirmada para el ${fecha} a las ${hora} en la mesa ${mesa}. ¡Te esperamos!`,
//     });

//     console.log("WhatsApp enviado con éxito:", message.sid);
//   } catch (error) {
//     console.error("Error enviando WhatsApp:", error);
//   }
// };

// // Enviar notificación por SMS
// export const enviarSMS = async (reserva) => {
//   const { telefono, nombreCliente, fecha, hora, mesa } = reserva;

//   try {
//     const message = await twilioClient.messages.create({
//       from: "", // Tu número de Twilio
//       to: `+51${telefono}`, // Número del usuario (Perú)
//       body: `Hola ${nombreCliente}, tu reserva ha sido confirmada para el ${fecha} a las ${hora} en la mesa ${mesa}. ¡Te esperamos!`,
//     });

//     console.log("SMS enviado con éxito:", message.sid);
//   } catch (error) {
//     console.error("Error enviando SMS:", error);
//   }
// };
