import nodemailer from "nodemailer";
const password1="multiservicios1234";
const password="blrwvisduvlidddo";
const correo="MultiServiciosEnAmerica@gmail.com";

// Configura el transporte de Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // O el servicio de correo que uses
  port: 587,
  auth: {
    user: correo,
    pass: password,
  },
});

// Función para enviar el correo de confirmación de registro
async function sendEmailDate(email, nameClient, nameProfessional, date, hora) {
  try {
    await transporter.sendMail({
      from: "MultiServiciosEnAmerica@gmail.com",
      to: email,
      subject: "Agenda de citas",
      text: "¡Gracias por agendar!",
      html:  `
      <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="generator" content="MSHTML 11.00.10570.1001">
    <title>MULTISERVICIOS</title>
    <style>
        p {
            font-family: "Arial", sans-serif;
            font-size: 13px;
            font-weight: normal;
            color: #2b333c;
            text-align: left;
            margin: 0;
            line-height: 21px;
        }
    </style>
</head>
<body style="height: 100%; border-collapse: collapse; padding: 0; border-spacing: 0; margin: 0;">
    <table border="0" cellpadding="0" cellspacing="0" style="width: 692px; background-color: #fff;" align="center">
        <tr>
            <td style="border-collapse: collapse; border-spacing: 0; padding: 0;">
                <table border="0" cellpadding="0" cellspacing="0" style="box-sizing: border-box; max-width: 692px!important; width: 100%; border-collapse: collapse; min-width: 100%; table-layout: fixed; padding: 0; border-spacing: 0; margin: 0 auto; background-color: #fff;" align="center" class="main">
                    <tr>
                        <td style="border-collapse: collapse; border-spacing: 0;">
                            <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; table-layout: fixed; border-spacing: 0;" width="100%">
                                <tbody>
                                    <tr>
                                        <td style="padding: 9px;">
                                            <img src="https://firebasestorage.googleapis.com/v0/b/react-firebase-upload-480ee.appspot.com/o/ImagePublication%2FBlack%20White%20Minimalist%20Elegant%20Calligraphy%20Email%20Signature.png_1709441462615?alt=media&token=dcd2c4c7-62c3-48e7-8199-01177c50ef52" data-imagetype="External" width="100%" alt="logo multi">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; table-layout: fixed; border-spacing: 0;" width="100%">
                                <tr>
                                    <td style="height: 40px; width: 100%; border-collapse: collapse; color: transparent!important; border-spacing: 0; line-height: 40px;"></td>
                                </tr>
                                <tr>
                                    <td style="border-collapse: collapse; border-spacing: 0;" align="center">
                                        <table border="0" cellpadding="0" cellspacing="0" style="max-width: 650px; border-collapse: collapse; border-spacing: 0;" width="100%">
                                            <tr>
                                                <td style="width: 20px; border-collapse: collapse; min-width: 20px; color: transparent!important; border-spacing: 0;"></td>
                                                <td style="border-collapse: collapse; border-spacing: 0;" valign="middle" align="center">
                                                    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; table-layout: fixed; border-spacing: 0;" width="100%">
                                                        <tr>
                                                            <td style="border-collapse: collapse; border-spacing: 0;">
                                                                <p>HOLA, ${nameClient}</p><br></br>
                                                                <p>
                                                                    SU CITA HA SIDO AGENDADA CON EL ESPECIALISTA <b>${nameProfessional},</b> el día <b>${date}</b> a las <b>${hora}</b>
                                                                </p><br></br>
                                                                <p>
                                                                    Atentamente,<br>Equipo multiServicios
                                                                </p><br></br><br></br>
                                                                <p style="font-size: 13px; text-align: center;"><b>Este correo es informativo, te agradecemos no dar respuesta</b></p>
                                                                <hr color="#1B3EEC">
                                                                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; table-layout: fixed; border-spacing: 0;" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="10%">
                                                                                    <a href="https://www.facebook.com/"><img data-imagetype="External" src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg" alt="facebook" width="40"></a>
                                                                            </td>
                                                                            <td width="10%">
                                                                                <a href="https://twitter.com/"><img data-imagetype="External" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png" alt="twitter" width="40"></a>
                                                                            </td>
                                                                            <td width="10%">
                                                                                <a href="https://www.instagram.com/"><img data-imagetype="External" src="https://static.vecteezy.com/system/resources/previews/023/986/521/non_2x/instagram-logo-instagram-logo-transparent-instagram-icon-transparent-free-free-png.png" alt="instagram" width="40"></a>
                                                                            </td>
                                                                            <td width="10%">
                                                                                <a href="https://www.youtube.com/"><img data-imagetype="External" src="https://img.freepik.com/vector-premium/logotipo-rojo-youtube-logotipo-redes-sociales_197792-1803.jpg" alt="youtube" width="40"></a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <td style="width: 20px; border-collapse: collapse; min-width: 20px; color: transparent!important; border-spacing: 0;"></td>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `,
    });
    console.log("Correo de cita programada enviado."+email);
  } catch (error) {
    console.error("Error al enviar el correo de cita programada:", error);
  }
}

export default sendEmailDate;