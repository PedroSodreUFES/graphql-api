import { createParameterDecorator, type ResolverData } from "type-graphql"
import type { GraphqlContext } from "../context/index.js"
import type { User } from "../../generated/prisma/client.js"
import { prismaClient } from "../../../prisma/prisma.js"

export const GqlUser = () => {
    return createParameterDecorator(
        async({ context }: ResolverData<GraphqlContext>): Promise<User | null>  => {
            if (!context || !context.user) return null

            try {
                const user = await prismaClient.user.findUnique({
                    where: {
                        id: context.user
                    }
                })
                if (!user) throw new Error("User not found!")
                return user
            } catch (error) {
                console.log("Erro ao instanciar o gqluser.")
            }
            return null
        })
}