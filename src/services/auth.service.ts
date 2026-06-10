import { prismaClient } from "../../prisma/prisma.js";
import type { LoginInput, RegisterInput } from "../dtos/input/auth.input.js";
import type { User } from "../generated/prisma/client.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { signJwt } from "../utils/jwt.js";

export class AuthService {

    async login(data: LoginInput) {
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (!existingUser) throw new Error("Credenciais inválidas.")
        if (!existingUser.password) throw new Error("Credenciais Inválidas.")

        const isValidPassword = await comparePassword(
            data.password,
            existingUser.password
        )

        if(!isValidPassword) throw new Error("Credenciais inválidas.")

        return this.generateToken(existingUser)
    }

    async register(data: RegisterInput) {
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        })

        if(existingUser) throw new Error("Email já cadastrado!")

        const hash = await hashPassword(data.password)

        const user = await prismaClient.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash
            }
        })

        return this.generateToken(user)
    }

    private generateToken(user: User) {
        const token = signJwt({
            id: user.id,
            email: user.email
        }, '15m')

        const refreshToken = signJwt({
            id: user.id,
            email: user.email
        }, '1d')

        return { token, refreshToken, user }
    }
}