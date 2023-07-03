import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"
import { Typemovement } from "@prisma/client"

const idConst = {
    id: z.number()
}

const tipoConst =  {
    type: z.nativeEnum(Typemovement)
}

const movementConst = {
    movement: z.string()
}

const statusConst = {
    status: z.boolean()
}

const createMovemSchema = z.object({
    ...tipoConst,
    ...movementConst
})

const upateMovemSchema = z.object({
    ...tipoConst,
    ...movementConst,
    ...statusConst
})

const deleteMovemSchema = z.object({
    ...statusConst
})

const idMovemSchema = z.object({
    ...idConst
})

export type CreateMovemSchema = z.infer<typeof createMovemSchema>
export type UpateMovemSchema = z.infer<typeof upateMovemSchema>
export type DeleteMovemSchema = z.infer<typeof deleteMovemSchema>
export type IdMovemSchema = z.infer<typeof idMovemSchema>


export const {schemas: movementSchmema, $ref } = buildJsonSchemas({
    createMovemSchema,
    upateMovemSchema,
    deleteMovemSchema,
    idMovemSchema
}, {$id: "Movemnt_Schema"})