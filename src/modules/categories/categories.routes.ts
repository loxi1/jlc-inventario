import type { FastifyInstance } from "fastify";
import { createCategories, updCategory, removeCategory } from "./categories.controllers";
import { $ref } from "./categories.schemas";

async function categoryRoutes(app: FastifyInstance) {
    app.post("/register", {
        preHandler: [app.authenticate],
        schema: {
            tags: ["Category"],
            body: $ref("createSchema"),
            response: {
                201: $ref("responseOkSchema"),
                400: $ref("responseSchema"),
                401: $ref("responseSchema"),
                500: $ref("responseSchema")
            }
        }
    }, createCategories)

    app.put("/update/:id", {
        preHandler: [app.authenticate],
        schema: {
            tags: ["Category"],
            body: $ref("createSchema"),
            response: {
                201: $ref("responseOkSchema"),
                400: $ref("responseOkSchema"),
                401: $ref("responseOkSchema"),
                500: $ref("responseOkSchema")
            }
        }
    }, updCategory)

    app.put("/delete/:id", {
        preHandler: [app.authenticate],
        schema: {
            tags: ["Category"],
            body: $ref("statusSchema"),
            response: {
                201: $ref("responseOkSchema"),
                400: $ref("responseOkSchema"),
                401: $ref("responseOkSchema"),
                500: $ref("responseOkSchema")
            }
        }
    }, removeCategory)
}

export default categoryRoutes
