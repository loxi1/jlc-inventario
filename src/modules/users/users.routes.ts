import type { FastifyInstance } from "fastify";
import { forgotYourPassword, loginHandler, registerUsers, setActive, updatePassword } from "./users.controllers";
import { $ref } from "./users.schemas";

async function UserRoutes(app: FastifyInstance) {
    app.post("/register", {
        schema: {
            tags: ['User'],
            summary: 'Register user',
            body: $ref("createUserSchema"),
            response: {
                200: $ref("responseOkSchema"),
                201: $ref("responseOkSchema")
            }
        }
    }, registerUsers)

    app.get("/validation/:salt", {
        schema: {
            tags: ['User'],
            summary: 'Activate user',
            params: $ref("activeSchema"),
            response: {
                200: $ref("responseOkSchema")
            }
        }
    }, setActive)
    
    app.post("/login", {
        schema: {
            tags: ['User'],
            summary: 'Login user',
            body: $ref('loginSchema'),
            response: {
                200: $ref("loginResponseSchema"),
                400: {          // this error is custom when the user doesn't fill all queries
                    description:'Missing fill queries. missingFields is going to be filled with all the fields that are missing',
                    types:'object',
                    properties: {
                        status: {
                            type: 'string',
                            example:'failed'
                        },
                            error:{
                            type:'string',
                            example:'Please fill in all the queries'
                        },
                        missingFields:{
                            type: 'array',
                            example:[]
                        }
                    }
                }
            }
        }
    }, loginHandler)

    app.post("/sendmailchangepwd", {
        schema: {
            tags: ['User'],
            summary: 'Send email to confirm, recover password',
            body: $ref("emailSchema"),
            response: {
                200: $ref('responseOkSchema')
            }
        }
    }, forgotYourPassword)

    app.post("/changepassword", {
        schema: {
            tags: ['User'],
            body: $ref('updatePasswordSchema'),
            response: {
                200: $ref('responseOkSchema')
            }
        }
    }, updatePassword)
}

export default UserRoutes