import prisma from "../../utils/prisma";
import { CreateRoleSchema, UpdateRoleSchema } from "./roles.schemas";

export async function getRole(roles:string) {
    return await prisma.role.findFirst({
        where: {
            role: roles,
            status: true
        }
    })
}

export async function createRole(input: CreateRoleSchema) {
    return await prisma.role.create({
        data: {
            role: input.role
        }
    })
}

export async function updateRole(input: UpdateRoleSchema, idRol: number) {
    return await prisma.role.update({
        where: {
            id: idRol
        },
        data: input
    })
}

export async function deleteRole(idRol: number) {
    return await prisma.role.update({
        where: {
            id: idRol
        },
        data: {
            status: false
        }
    })
}