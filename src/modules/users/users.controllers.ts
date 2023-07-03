import type { FastifyReply, FastifyRequest } from "fastify"; 
import { createUser, findUserByEmail, getUserUnique, setActivar, updatePasswordById } from "./users.services";
import { ActiveSchema, CreateSchema, EmailSchema, LoginInput, UpdatePasswordSchema } from "./users.schemas";
import { verifyPassword } from "../../utils/hash";
import { sendMailCreateUser, sendMailActiveUser } from "../sendmail/send.grid";

export async function registerUsers(
    request: FastifyRequest<{
        Body: CreateSchema
    }>,
    reply: FastifyReply
) {
    const body = request.body
    try {
        const user = await findUserByEmail(body.email)
        const rta = { status: false, response: {} }
        const rps = { code: 500, msn: 'Error', rta: {} }

        if(!user.length) {
            const data = await createUser(body)
            
            rps.code = 400
            rps.msn = 'Error al registrar'

            if(data.id) {
                rta.status = true
                rps.code = 201
                const sendmail = await sendMailCreateUser(data)
                rps.msn = sendmail.code ? sendmail.msn : ""
            }
        } else {
            rta.status = true
            rps.code = 200
            rps.msn = user[0].status ? 'El usuario ya se registro' : 'Revice su correo para activar su cuenta'
        }
        rta.response = rps
        return reply.code(rps.code).send(rta)
    } catch (error) {
        return reply.code(500).send(error)
    }
}

export async function setActive(
    request: FastifyRequest<{
        Params: ActiveSchema
    }>,
    reply: FastifyReply
) {
    const activate = request.params
    
    const rta = { status: false, response: {}}
    const rsp = {code: 401, msn: ''}

    try {
        rta.status = true
        rsp.code = 201

        const user = await setActivar(activate)
        
        rsp.msn = (user) ? "Ok" : "Error"
        rta.response = rsp
        return reply.code(201).send(rta)
    } catch (error) {
        rsp.code = 500
        rsp.msn = "Error"
        rta.response = rsp
        return reply.code(500).send(rta)
    }
}

export async function forgotYourPassword(
    request: FastifyRequest<{
        Body: EmailSchema
    }>,
    reply: FastifyReply
) {
    const infoemail = request.body
    const rta = { status: false, response: {}}
    const rsp = {code: 401, msn: ''}

    try {
        rta.status = true
        rsp.code = 201

        const user = await getUserUnique(infoemail)
        rsp.msn = 'No existe usuario'

        if(user?.id) {
            const sendmail = await sendMailActiveUser(user)
            rsp.msn = sendmail.code ? sendmail.msn : ""
        }

        rsp.msn = (user) ? "Ok" : "Error"
        rta.response = rsp
        return reply.code(201).send(rta)

    } catch (error) {
        rsp.code = 500
        rsp.msn = "Error"
        rta.response = rsp
        return reply.code(500).send(rta)
    }
}

export async function loginHandler(
    request: FastifyRequest<{
        Body: LoginInput
    }>,
    reply: FastifyReply
) {
    const body = request.body

    //consultar usuario
    let alluser = await findUserByEmail(body.email)
    const rta = { status: false, response: {}}
    const rsp = {code: 401, msn: '', accessToken: '', name: '', email: ''}

    if(!alluser.length) {
        rsp.msn = 'No existe email'
        rta.response = rsp
        return reply.code(401).send(rta)
    } else {
        //verificar pasword
        if(alluser[0].status) {
            rsp.msn = "Clave incorrecta"
            const correctPassword = verifyPassword({
                candidatePassword: body.password,
                salt: alluser[0]?.salt,
                hash: alluser[0]?.password
            })

            if(correctPassword) {
                const { password, salt, ...res} = alluser[0]
                const token = await reply.jwtSign(res)
                rta.status = true
                rsp.code = 200
                rsp.msn = "Datos correctos"
                rsp.accessToken = token
                rsp.name = res.name
                rsp.email = res.email
                rta.response = rsp
            }
        }
        else {
        rta.status = true
        rsp.msn = 'No activo email'
        rta.response = rsp
        }
    }

    rta.response = rsp
    return rta
}

export async function updatePassword(
    request: FastifyRequest<{
        Body: UpdatePasswordSchema
    }>,
    reply: FastifyReply
    ) {
    const body = request.body
    const rta = { status: false, response: {}}
    const rsp = {code: 401, msn: ''}

    try {
        rta.status = true
        rsp.code = 201

        const user = await updatePasswordById(body)
        rsp.msn = (user) ? "Ok" : "Error"
        rta.response = rsp
        return reply.code(201).send(rta)
    } catch (error) {
        rsp.code = 500
        rsp.msn = "Error"
        rta.response = rsp
        return reply.code(500).send(rta)
    }
}