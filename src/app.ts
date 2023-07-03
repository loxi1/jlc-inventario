import fastifyCookie from '@fastify/cookie'
import Fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import { withRefResolver } from 'fastify-zod'
import swaggerUI from "@fastify/swagger-ui"
import type { FastifyRequest, FastifyReply } from 'fastify'
import { JWT_SECRET, BASE } from '../config'

//::Routes
import UserRoutes from './modules/users/users.routes'
import categoryRoutes from './modules/categories/categories.routes'
import rolRoutes from './modules/roles/roles.routes'

//::Schemas
import { userSchema } from './modules/users/users.schemas'
import { categorySchema } from './modules/categories/categories.schemas'
import { roleSchema } from './modules/roles/roles.schemas'

declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any;
    }
}

declare module "@fastify/jwt" {
    interface FastifyJWT {
        user: {
            id: number;
            email: string;
            name: string;
        };
    }
}

export function buildApp() {
    const app = Fastify()
    app.register(cors);

    app.register(fastifyJwt, {
        secret: JWT_SECRET,
        sign: {
            expiresIn: '2h'
        }
    })

    app.register(fastifySwagger, withRefResolver({
        openapi: {
            info: {
                title: 'TryCatch 04',
                description: 'http://localhost:4000',
                version: '1.0.0'
            }
        }
    }))

    app.register(swaggerUI, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'list',
            deepLinking: false
        },
        uiHooks: {
            onRequest: function(request, reply, next) {
                next()
            },
            preHandler: function(request, reply, next) {
                next()
            }
        },
        staticCSP: true,
        transformStaticCSP: (header: any) => header,
        transformSpecificationClone: true
    })

    app.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply, done: any) => {
        try {
            await request.jwtVerify();
        } catch (error) {
            done()
        }
    })

    //::Register Schema
    for (const schema of [...userSchema, ...categorySchema, ...roleSchema]) {
        app.addSchema(schema)
    }

    //::Register Routes
    app.register(UserRoutes, {prefix: BASE+`users`})
    app.register(categoryRoutes, {prefix: BASE+`categories`})
    app.register(rolRoutes, {prefix: BASE+`roles`})

    return app
}

export default buildApp

