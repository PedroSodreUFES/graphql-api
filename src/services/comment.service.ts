import { prismaClient } from "../../prisma/prisma.js";
import type { CreateCommentInput } from "../dtos/input/comment.input.js";

export class CommentService {
    async create(
        ideaId: string,
        authorId: string,
        data: CreateCommentInput,
    ) {
        const existingIdea = await prismaClient.idea.findUnique({
            where: {
                id: ideaId
            }
        })

        if(!existingIdea) throw new Error("Idea not found")

        const existingUser = await prismaClient.user.findUnique({
            where: {
                id: authorId
            }
        })

        if(!existingUser) throw new Error("User not found")

        return prismaClient.comment.create({
            data: {
                content: data.content,
                authorId: authorId,
                ideaId: ideaId
            }
        })
    }

    async listCommentsByIdea(ideaId: string) {
        return prismaClient.comment.findMany({
            where: {
                ideaId: ideaId
            }
        })
    }
}