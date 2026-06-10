import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { CreateIdeaInput, UpdateIdeaInput } from "../dtos/input/idea.input.js";
import type { User } from "../generated/prisma/client.js";
import { GqlUser } from "../graphql/decorators/user.decorator.js";
import { isAuth } from "../middleware/auth.middleware.js";
import { IdeaModel } from "../models/idea.model.js";
import { IdeaService } from "../services/idea.service.js";
import { UserModel } from "../models/user.model.js";
import { UserService } from "../services/user.service.js";

@Resolver(() => IdeaModel)
@UseMiddleware(isAuth)
export class IdeaResolver {
    private ideaService = new IdeaService()
    private userService = new UserService()

    @Mutation(() => IdeaModel)
    async createIdea(
        @Arg('data', () => CreateIdeaInput) data: CreateIdeaInput,
        @GqlUser() user: User
    ): Promise<IdeaModel> {
        return this.ideaService.createIdea(data, user.id)
    }

    @Query(() => [IdeaModel])
    async listIdea(): Promise<IdeaModel[]> {
        return this.ideaService.listIdea()
    }

    @Mutation(() => IdeaModel)
    async updateIdea(
        @Arg('data', () => UpdateIdeaInput) data: UpdateIdeaInput,
        @Arg('id', () => String)id: string
    ): Promise<IdeaModel> {
        return this.ideaService.updateIdea(id, data)
    }

    @Mutation(() => Boolean)
    async deleteIdea(
        @Arg('id', () => String) id: string
    ): Promise<boolean> {
        return this.ideaService.deleteIdea(id)
    }

    @FieldResolver(() => UserModel)
    async author(@Root() idea: IdeaModel): Promise<UserModel> {
        return this.userService.findUser(idea.authorId)
    }
}