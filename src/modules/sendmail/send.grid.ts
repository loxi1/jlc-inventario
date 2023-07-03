import { boolean, string } from "zod";
import { SENDGRID_API_KEY } from "../../../config/";
import { DataMailActiveSchema, DataMailCreateSchema } from "../users/users.schemas";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(SENDGRID_API_KEY)
const hostName = 'http://localhost:4000';

export interface rtaMsn {
    code: boolean;
    msn: string;
}

export async function sendMailCreateUser(data:DataMailCreateSchema) {
    const rps:rtaMsn = { code: false, msn: "Error"}
    
    const msg = {
        to: data.email, // Change to your recipient
        from: 'j.eloy.cayetano.m@gmail.com', // Change to your verified sender
        subject: `Detalles de la cuenta de ${data.name} en ${hostName}`,
        text: `Registrar usuario`,
        html: `<table style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;margin:auto;background-color:#ebebeb;text-align:center" border="0" cellspacing="0" cellpadding="0" width="600">
        <tbody>
            <tr style="line-height:0px">
                <td style="line-height:0px" width="600" valign="bottom">
                    <img width="600" src="https://ci4.googleusercontent.com/proxy/khxBq-7bG5rA_M_YcEdqEK-YPAi_S07l36Nkae3PTcx4YW5Xi12IDXvGqXN8JtMnMxRrS_zJnREx7hF89W9e9zbULrPYACx-a1d2oi160ZhaKQ9Fz4hcOoQ=s0-d-e1-ft#https://www.valentina-db.com/media/com_hikashop/images/mail/header.png" border="0" alt="" class="CToWUd" data-bit="iit">
                </td>
            </tr>
            <tr>
                <td width="600"> 
                    <table border="0" cellspacing="0" cellpadding="0" width="600" style="margin:0px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px">
                        <tbody>
                            <tr>
                                <td width="20"></td>
                                <td style="color:#575757" width="560" height="25"></td>
                                <td width="20"></td>
                            </tr>
                            <tr>
                                <td width="20"></td>
                                <td style="border:1px solid #adadad;background-color:#ffffff;text-align:left;padding:6px"> 
                                Hola,<br> 
                                Gracias por registrarse en <a href="${hostName}" target="_blank" data-saferedirecturl="https://www.google.com/url?q=${hostName}">${hostName}</a>.<br> 
                                Su cuenta debe ser activada haciendo clic en el siguiente enlace. A continuación, podrá continuar dar click al enlace. <br><br> 
                                <a href="${hostName}/users/auth/validation/${data.salt}">${hostName}/<wbr>users/<wbr>auth/<wbr>validation/<wbr>${data.salt}</a> <br><br> <br> 
                                Username : <a href="mailto:${data.email}" target="_blank">${data.email}</a><br> <br> <br> Atentamente, <br>
                                TryCatch 02 
                                </td>
                                <td width="20"></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr style="line-height:0px"> 
                <td style="line-height:0px" width="600" valign="top"> <img width="600" src="https://ci4.googleusercontent.com/proxy/wg85m4s6gCokDE73UzX_0BKa_ERZp2MmpB7GQIcmEkmXMniSJlDgxADZRWvFGvO8H4yiQVHDRrOyr3cyuOMzJfAZTAaO7x59rFJTVX0vFvu4zUKZmXvKPQ0=s0-d-e1-ft#https://www.valentina-db.com/media/com_hikashop/images/mail/footer.png" border="0" alt="--" class="CToWUd" data-bit="iit"></td>
            </tr>
        </tbody> 
    </table>`
    }
    await sgMail.send(msg)
    .then(() => {
        rps.msn = 'Se envio un correo de validación'
        rps.code = true
        console.log(rps.msn)
    })
    .catch((er: any) => {
        console.error(er)
        rps.msn = 'Error al enviar correo de validacion'
    })

    return rps
}

export async function sendMailActiveUser(data:DataMailActiveSchema) {
    const rps:rtaMsn = { code: false, msn: "Error"}
    
    const msg = {
        to: data.email, // Change to your recipient
        from: 'j.eloy.cayetano.m@gmail.com', // Change to your verified sender
        subject: `Recuperar password de ${data.name} en ${hostName}`,
        text: `Restablecer password`,
        html: `<table style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;margin:auto;background-color:#ebebeb;text-align:center" border="0" cellspacing="0" cellpadding="0" width="600">
    <tbody>
        <tr style="line-height:0px"> <td style="line-height:0px" width="600" valign="bottom">
            <td>
                <img width="600" src="https://ci4.googleusercontent.com/proxy/khxBq-7bG5rA_M_YcEdqEK-YPAi_S07l36Nkae3PTcx4YW5Xi12IDXvGqXN8JtMnMxRrS_zJnREx7hF89W9e9zbULrPYACx-a1d2oi160ZhaKQ9Fz4hcOoQ=s0-d-e1-ft#https://www.valentina-db.com/media/com_hikashop/images/mail/header.png" border="0" alt="" class="CToWUd" data-bit="iit">
            </td>
        </tr>
        <tr>
            <td width="600"> 
                <table border="0" cellspacing="0" cellpadding="0" width="600" style="margin:0px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px">
                    <tbody>
                        <tr>
                            <td width="20"></td>
                            <td style="color:#575757" width="560" height="25"></td>
                            <td width="20"></td>
                        </tr>
                        <tr>
                            <td width="20"></td>
                            <td style="border:1px solid #adadad;background-color:#ffffff;text-align:left;padding:6px">
                            Hola,<br> Solicito recuperar el password en <a href="${hostName}" target="_blank" data-saferedirecturl="https://www.google.com/url?q=${hostName}">${hostName}</a>.<br>
                            Cambiar el password. A continuación, podrá continuar dar click al enlace. <br><br> 
                            <a href="${hostName}/users/cambiarpassword/${data.email}">${hostName}/<wbr>users/<wbr>cambiarpassword/<wbr>${data.email}</a> 
                            <br><br> <br> Username : <a href="mailto:${data.email}" target="_blank">${data.email}</a><br> <br> <br> 
                            Atentamente, <br>TryCatch 02 
                            </td>
                            <td width="20"></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr style="line-height:0px">
            <td style="line-height:0px" width="600" valign="top">
                <img width="600" src="https://ci4.googleusercontent.com/proxy/wg85m4s6gCokDE73UzX_0BKa_ERZp2MmpB7GQIcmEkmXMniSJlDgxADZRWvFGvO8H4yiQVHDRrOyr3cyuOMzJfAZTAaO7x59rFJTVX0vFvu4zUKZmXvKPQ0=s0-d-e1-ft#https://www.valentina-db.com/media/com_hikashop/images/mail/footer.png" border="0" alt="--" class="CToWUd" data-bit="iit">
            </td>
        </tr>
    </tbody> </table>`,
    }
    await sgMail.send(msg)
    .then(() => {
        rps.msn = 'Email de cambio de password enviado'
        rps.code = true
    })
    .catch((er: any) => {
        console.error(er)
        rps.msn = 'Error al enviar correo'
    })

    return rps
}