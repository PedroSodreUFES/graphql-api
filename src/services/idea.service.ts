import { prismaClient } from "../../prisma/prisma.js";
import type { CreateIdeaInput, UpdateIdeaInput } from "../dtos/input/idea.input.js";

export class IdeaService {
    async createIdea(data: CreateIdeaInput, authorId: string) {
        return prismaClient.idea.create({
            data: {
                title: data.title,
                description: data.description ?? null,
                authorId: authorId
            }
        })
    }

    async deleteIdea(id: string) {
        const existsIdea = await prismaClient.idea.findUnique({
            where: {
                id: id
            }
        })

        if (!existsIdea) throw new Error("Idea not found")
        
        await prismaClient.idea.delete({
            where: {
                id: id,
            }
        })
        
        return true
    }

    async findIdeaById(id: string) {
        const idea = await prismaClient.idea.findUnique({
            where: {
                id: id
            }
        })

        if (!idea) throw new Error("Idea not found")

        return idea
    }

    async listIdea() {
        return prismaClient.idea.findMany()
    }

    async updateIdea( id: string, data: UpdateIdeaInput) {
        if(!id) throw new Error("Id da ideia obrigatório!")
        
        const idea = await prismaClient.idea.findUnique({
            where: {
                id: id
            },
        })

        if (!idea) throw new Error("Ideia não encontrada.")

        return prismaClient.idea.update({
            where: {
                id: id
            },
            data: {
                title: data.title,
                description: data.description
            }
        })
    }
}