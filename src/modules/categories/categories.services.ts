import prisma from "../../utils/prisma";
import { CreateSchema, SearchCategorySchema, StatusSchema } from "./categories.schemas";

export async function getByCategory(input:SearchCategorySchema) {
    return prisma.category.findFirst({
        where: {
            category: input.category,
            status: true
        }
    })
}

export async function createCategory(input: CreateSchema, idUser: number) {
    return prisma.category.create({
        data: {
            category: input.category,
            userId: idUser
        }
    })
}

export async function deleteCategory(idCat: number, input: StatusSchema) {
    return prisma.category.update({
        where: {
            id: idCat
        },
        data: {
            status: input.status,
            userId: input.userId
        }
    })
}

export async function updateCategory(idCat: number, input: CreateSchema) {
    return prisma.category.update({
        where: {
            id: idCat
        },
        data: {
            category: input.category,
            userId: input.userId
        }
    })
}