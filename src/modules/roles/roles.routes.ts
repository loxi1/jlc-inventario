import type { FastifyInstance } from "fastify";
import { modifyRole, registerRole, removeRole } from "./roles.controllers";
import { $ref } from "./roles.schemas";

export async function rolRoutes(app: FastifyInstance) {
    app.post("/register", {
        schema: {
            tags: ["Rol"],
            body: $ref("createRoleSchema"),
            response: {
                200: $ref("responseSchema"),
                201: $ref("responseOkSchema"),
                500: $ref("responseSchema")
            }
        }
    }, registerRole)

    app.put("/update/:id", {
        schema: {
            tags: ["Rol"],
            body: $ref("updateRoleSchema"),
            params: $ref("idRoleSchema"),
            response: {
                200: $ref("responseSchema"),
                400: $ref("responseSchema"),
                500: $ref("responseSchema")
            }
        }
    }, modifyRole)

    app.get("/delete/:id", {
        schema: {
            tags: ["Rol"],
            params: $ref("idRoleSchema"),
            response: {
                200: $ref("responseSchema"),
                400: $ref("responseSchema"),
                500: $ref("responseSchema")
            }
        }
    }, removeRole)
}

export default rolRoutes