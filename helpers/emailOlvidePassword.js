import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

const emailOlvidePassword =async(datos)=>{
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
        subject:  'Restablece tu Password',
        text: 'Restablece tu Password',
        html: `<p>Hola: ${nombre}, has solicitado restablecer tu password</p>

               <p>Sigue el siguiente enlace para generar un nuevo password:
               <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Password</a> </p>
               
               <p>Si tu no creaste esta cuenta puedes ignorar el mensaje</p>
        `
      });
      console.log("mensaje enviado : %s", info.messageId);
}

export default emailOlvidePassword;


