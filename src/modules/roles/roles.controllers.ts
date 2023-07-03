import type { FastifyReply, FastifyRequest} from "fastify"
import { CreateRoleSchema, IdRoleSchema, UpdateRoleSchema } from "./roles.schemas"
import { createRole, deleteRole, getRole, updateRole } from "./roles.services"

export async function registerRole(
    request: FastifyRequest<{
        Body: CreateRoleSchema
    }>,
    reply: FastifyReply
) {
    const body = request.body

    const rta = { status: false, response: {} }
    const rps = { code: 500, msn: 'Error'}
    const rps2 = { code: 500, msn: 'Error', rta: {} }
    const crea = {role: body.role}

    try {
        const exist = await getRole(body.role)
        rps.code = 200
        rps.msn = "Existe rol"
        if(!exist?.id) {
            const save = await createRole(crea)
            rps.code = 400
            rps.msn = "Error al registrar" 
            if(save.id) {
                rps2.code = 201
                rps2.msn = "Registro Ok" 
                rps2.rta = save
            }
        }
        const code = rps2.code == 201 ? rps2.code : rps.code
        rta.response = code == 201 ? rps2 : rps

        return reply.code(code).send(rta)
    } catch (error) {
        rta.response = rps
        return reply.code(rps.code).send(rta)
    }
}

export async function modifyRole(
    request: FastifyRequest<{
        Body: UpdateRoleSchema,
        Params: IdRoleSchema
    }>,
    reply: FastifyReply
) {
    const body = request.body
    const para = request.params

    const rta = { status: false, response: {} }
    const rps = { code: 500, msn: 'Error'}

    try {
        const upd = await updateRole(body, para.id)
        rps.code = 400
        rps.msn = "Error al guardar"
        if(upd.id) {
            rps.code = 200
            rps.msn = "Guardo Ok"
        }

        rta.response = rps
        return reply.code(rps.code).send(rta)
    } catch (error) {
        rta.response = rps
        return reply.code(rps.code).send(rta)
    }
}

export async function removeRole(
    request: FastifyRequest<{
        Params: IdRoleSchema
    }>,
    reply: FastifyReply
) {
    const para = request.params

    const rta = { status: false, response: {} }
    const rps = { code: 500, msn: 'Error'}
    
    try {
        const dele = await deleteRole(para.id)
        rps.code = 400
        rps.msn = "Error al eliminar"
        if(dele.id) {
            rps.code = 200
            rps.msn = "Eliminado Ok"
        }
        rta.response = rps
        return reply.code(rps.code).send(rta)
    } catch (error) {
        rta.response = rps
        return reply.code(rps.code).send(rta)
    }
}