import prisma from "../../utils/prisma";
import { CreateMovemSchema } from "./movements.schemas";

export async function createMovements(input: CreateMovemSchema) {
    return await prisma.movement.create({
        data: {
            userId: 0,
            movement: input.movement,
            type: input.type
        }
    })
}