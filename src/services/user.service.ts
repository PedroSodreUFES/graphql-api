import { prismaClient } from "../../prisma/prisma.js";
import type { CreateUserInput } from "../dtos/input/user.input.js";

export class UserService {
    async findUser(id: string) {
        const user = await prismaClient.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) throw new Error("Usuário não existe!")

        return user
    }

    async createUser(data: CreateUserInput) {
        const existingUser = prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        })

        if(!!existingUser) throw new Error("Usuário já cadastrado.")

        return prismaClient.user.create({
            data: {
                name: data.name,
                email: data.email,
            }
        })
    }

    async listUser() {
        return prismaClient.user.findMany()
    }
}