import prisma from "../../utils/prisma";
import { hashPassword } from "../../utils/hash";
import { ActiveSchema, CreateSchema, EmailSchema, UpdatePasswordSchema } from "./users.schemas";

export async function createUser(input:CreateSchema) {
    const { password, ...res } = input
    const { hash, salt } = hashPassword(password)

    return await prisma.user.create({
        data: {
            ...res, salt, password: hash
        }
    })
}

export async function setActivateUser(encrip: ActiveSchema) {
    const info = await prisma.user.findMany({
        where: {
            salt: encrip.salt,
            status: false
        },
        select : {
            id: true,
            email: true
        }
    })

    let upd = {}

    if((info.length)) {
        upd = await prisma.user.update({
            where: {
             email: info[0].email
            },
            data : {
                status : true
            },
            select: {
                email: true
            }
        })
    }
    return upd   
}

export async function findUserByEmail(email: string) {
    return await prisma.user.findMany({
        where: {
            email
        },
        select: {
            id: true,
            name: true,
            email: true,
            status: true,
            password: true,
            salt: true
        }
    })
}

export async function setActivar(encrip: ActiveSchema) {
    const info = await prisma.user.findMany({
        where: {
            salt: encrip.salt,
            status: false
        },
        select: {
            id: true,
            email: true
        }
    })
    
    let upd = {}

    if(info.length) {
        upd = await prisma.user.update({
            where: {
                email: info[0].email
            },
            data : {
                status: true
            },
            select: {
                email: true
            }
        })
    }

    return upd
}

export async function getUserUnique(input: EmailSchema) {
    return await prisma.user.findUnique({
        where: {
            email: input.email
        }
    })
}

export async function updatePasswordById(input: UpdatePasswordSchema){
    const saltold = input.salt
    const info = await prisma.user.findMany({
        where: {
            salt: saltold
        },
        select: {
            id: true,
            email: true
        }
    })
    let user = {}
    if(info[0].id) {
        const password = input.password
        const { hash, salt } = hashPassword(password)
        user = await prisma.user.update({
            where: {
                id: info[0].id
            },
            data: {
                salt,
                password: hash
            }
        })
    }
    const code = user ? true : false
    const msn = user ? "Ok" : "Error"
    return {code, msn}
}