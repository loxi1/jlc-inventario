import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"

const idConst = {
    id: z.number()
}

const roleConst = {
    role: z.string()
}

const statusConst = {
    status: z.boolean()
}

const createRoleSchema = z.object({
    ...roleConst
})

const updateRoleSchema = z.object({
    ...roleConst,
    status: z.boolean().optional()
})

const deleteRoleSchema = z.object({
    ...statusConst
})

const idRoleSchema = z.object({
    ...idConst
})

const statusRoleSchema = z.object({
    ...statusConst
})

const responseOkSchema = z.object({
    status: z.boolean(),
    response: z.object({
        code: z.number(),
        msn: z.string(),
        rta: z.object({
            ...idConst,
            ...roleConst,
            ...statusConst
        }).optional()
    })
})

const responseSchema = z.object({
    status: z.boolean(),
    response: z.object({
        code: z.number(),
        msn: z.string()
    })
})

export type CreateRoleSchema = z.infer<typeof createRoleSchema>
export type UpdateRoleSchema = z.infer<typeof updateRoleSchema>
export type DeleteRoleSchema = z.infer<typeof deleteRoleSchema>
export type IdRoleSchema = z.infer<typeof idRoleSchema>
export type StatusRoleSchema = z.infer<typeof statusRoleSchema>

export const { schemas: roleSchema, $ref } = buildJsonSchemas({
    createRoleSchema,
    updateRoleSchema,
    deleteRoleSchema,
    idRoleSchema,
    statusRoleSchema,
    responseSchema,
    responseOkSchema
}, {$id: 'Role_Schema'})