import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"

const idConst = {
    id: z.number()
}

const saltConst = {
    salt: z.string()
}

const nameConst = {
    name: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be string"
    })
}

const pwdConst = {
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be string"
    })
}

const emailConst = {
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    }).email()
}

const createUserSchema = z.object({
    ...emailConst,
    ...nameConst,
    ...pwdConst
})

const loginSchema = z.object({
    ...emailConst,
    ...pwdConst
})

const loginResponseSchema = z.object({
    status: z.boolean(),
    response: z.object({
        code: z.number(),
        msn: z.string(),
        accessToken: z.string(),
        name: z.string(),
        email: z.string()
    })
})

const activeSchema = z.object({
    ...saltConst
})

const emailSchema = z.object({
    ...emailConst
})

const dataMailCreateSchema = z.object({
    ...nameConst,
    ...emailConst,
    ...saltConst
})

const dataMailActiveSchema = z.object({
    ...nameConst,
    ...emailConst
})

const responseOkSchema = z.object({
    status: z.boolean(),
    response: z.object({
        code: z.number(),
        msn: z.string(),
        rta: z.object({
            name: z.string().optional(),
            email: z.string().optional(),
            current_location: z.string().optional()
        }).optional()
    })    
})

const updatePasswordSchema = z.object({
    ...saltConst,
    ...pwdConst
})

export type CreateSchema = z.infer<typeof createUserSchema>
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type LoginResponseSchema = z.infer<typeof loginResponseSchema>
export type ActiveSchema = z.infer<typeof activeSchema>
export type EmailSchema = z.infer<typeof emailSchema>
export type DataMailCreateSchema = z.infer<typeof dataMailCreateSchema>
export type DataMailActiveSchema = z.infer<typeof dataMailActiveSchema>

export const { schemas: userSchema, $ref } = buildJsonSchemas({
    createUserSchema,
    updatePasswordSchema,
    loginSchema,
    loginResponseSchema,
    activeSchema,
    emailSchema,
    responseOkSchema
}, {$id:'User_Schemas'})