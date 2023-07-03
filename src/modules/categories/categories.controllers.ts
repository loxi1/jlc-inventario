import type { FastifyReply, FastifyRequest } from "fastify"
import { CreateSchema, StatusSchema, UpdateCategory, ByIdSchema } from "./categories.schemas"
import { createCategory, getByCategory, deleteCategory, updateCategory } from "./categories.services"

export async function createCategories(
    request: FastifyRequest<{
        Body: CreateSchema
    }>,
    reply: FastifyReply
) {
    const body = request.body
    const rta = { status: false, response: {} }
    const rps = { code: 401, msn: 'Debe estar logueado'}
    const rps2 = { code: 401, msn: 'Debe estar logueado', rta: {} }
    const crea = {category: body.category, userId: 0}

    try {
        const jwt = await request.jwtVerify(function (err, decoded) {
            crea.userId = (decoded.id) ? decoded.id : crea.userId
        })

        rps.code = 200
        rps.msn = 'Ya esta registrado'

        if(crea.userId) {
            const data = await getByCategory({category: crea.category})

            if(!data.id ) {
                const save = await createCategory(body, crea.userId)
                rps.code = 400
                rps.msn = 'Error al registrar'

                if(save.id) {
                    rps2.code = 201
                    rps2.msn = 'Registro ok'
                    rps2.rta = save
                }
            } else {
                rps.code = 400
                rps.msn = 'Valor duplicado'
            }
        }        

        rta.response = (rps2.code == 201) ? rps2 : rps
        return reply.code(rps.code).send(rta)
    } catch (error) {
        rta.response = rps
        return reply.code(rps.code).send(rta)
    }
}

export async function updCategory(
    request: FastifyRequest<{
        Body: UpdateCategory,
        Params: ByIdSchema
    }>,
    reply: FastifyReply
) {
    const body = request.body
    const para = request.params

    const rta = { status: false, response: {} }
    const rps = { code: 500, msn: 'Error', rta: {} }

    const crea = {category:body.category, userId:0, status: body.status}

    try {
        const jwt = await request.jwtVerify(function (err, decoded) {
            crea.userId = (decoded.id) ? decoded.id : crea.userId
        })

        rps.code = 401
        rps.msn = "Debe estar logueado"

        if(crea.userId) {
            if(crea.category && para.id) {
                const upd = await updateCategory(para.id, crea)
                rps.code = 400
                rps.msn = "Error al guardar"
                if(upd.id) {
                    rps.rta = upd
                    rps.code = 201
                    rps.msn = "Ok"
                }
            }
        }
        
        rta.response = rps
        return reply.code(rps.code).send(rta)
    } catch (error) {
        rta.response = rps
        return reply.code(rps.code).send(rta)
    }
}

export async function removeCategory(
    request: FastifyRequest<{
        Body: StatusSchema,
        Params: ByIdSchema
    }>,
    reply: FastifyReply
) {
    const body = request.body
    const para = request.params

    const rta = { status: false, response: {} }
    const rps = { code: 500, msn: 'Error', rta: {} }

    const crea = {status:body.status, userId:0}

    try {
        const jwt = await request.jwtVerify(function (err, decoded) {
            crea.userId = (decoded.id) ? decoded.id : crea.userId
        })

        rps.code = 401
        rps.msn = "Debe estar logueado"

        if(crea.userId) {
            const upd = await deleteCategory(para.id, crea)
            rps.code = 400
            rps.msn = "Error al eliminar"
            if(upd.id) {
                rps.rta = upd
                rps.code = 200
                rps.msn = "Ok"
            }
        }
        
        rta.response = rps
        return reply.code(rps.code).send(rta)

    } catch (error) {
        rta.response = rps
        return reply.code(rps.code).send(rta)
    }
}