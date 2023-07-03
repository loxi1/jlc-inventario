import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"

const idConst = {
    id: z.number()
}

const statusConst = {
    status: z.boolean().optional()
}

const categoryConst = {
    category: z.string({
        required_error: "Category required"
    }).optional()
}

const userIdConst = {
    userId: z.number()
}

const createSchema = z.object({
    ...categoryConst
})

const byIdSchema = z.object({
    ...idConst
})

const deleteSchema = z.object({
    ...statusConst
})

const searchCategorySchema = z.object({
    ...categoryConst
})

const statusSchema = z.object({
    ...userIdConst,
    ...statusConst
})

const updSchema = z.object({
    ...categoryConst,
    ...statusConst
})

const responseOkSchema = z.object({
    status: z.boolean(),
    response: z.object({
        code: z.number(),
        msn: z.string(),
        rta: z.object({
            ...categoryConst,
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

export type CreateSchema = z.infer<typeof createSchema>
export type ByIdSchema = z.infer<typeof byIdSchema>
export type ResponseOkSchema = z.infer<typeof responseOkSchema>
export type DeleteSchema = z.infer<typeof deleteSchema>
export type SearchCategorySchema = z.infer<typeof searchCategorySchema>
export type StatusSchema = z.infer<typeof statusSchema>
export type UpdateCategory = z.infer<typeof updSchema>

export const { schemas: categorySchema, $ref } = buildJsonSchemas({
    createSchema,
    byIdSchema,
    responseOkSchema,
    deleteSchema,
    searchCategorySchema,
    statusSchema,
    updSchema,
    responseSchema
}, {$id: 'Category_Schema'})