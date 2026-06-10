import { prismaClient } from "../../prisma/prisma.js";

export class VoteService {
    async toggleVote(userId: string, ideaId: string): Promise<boolean> {
        const alreadyVoted = await prismaClient.vote.findUnique({
            where: {
                userId_ideaId: {
                    ideaId: ideaId,
                    userId: userId
                }
            }
        })

        if(alreadyVoted) {
            await prismaClient.vote.delete({
                where: {
                    userId_ideaId: {
                        userId: userId,
                        ideaId: ideaId
                    },
                },
            })
        } else {
            await prismaClient.vote.create({
                data: {
                    ideaId: ideaId,
                    userId: userId,
                },
            })
        }
        return true
    }

    async listVotesByIdea(ideaId: string) {
        return prismaClient.vote.findMany({
            where: {
                ideaId: ideaId
            }
        })
    }

    async countVotesByIdea(ideaId: string) {
        return prismaClient.vote.count({
            where: {
                ideaId: ideaId
            }
        })
    }
}