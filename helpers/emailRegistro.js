import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

const emailRegistro = async(datos)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      const {email, nombre ,token} = datos;

      //enviar el email
      const info = await transporter.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria",
        to: email,
        subject:  'Comprueba tu cuenta en APV',
        text: 'Comprueba tu cuenta en APV',
        html: `<p>Hola: ${nombre}, comprueba tu cuenta en APV.</p>
               <p>Tu cuenta ya esta lista, solo debes comprobar en el siguiente enlace:
               <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar tu Cuenta</a> </p>
               
               <p>Si tu no creaste esta cuenta puedes ignorar el mensaje</p>
        `
      });
      console.log("mensaje enviado : %s", info.messageId);
}

export default emailRegistro;


