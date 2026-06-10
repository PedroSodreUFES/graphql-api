import { Arg, FieldResolver, Mutation, Resolver, Root } from "type-graphql";
import { CommentModel } from "../models/comment.model.js";
import { CreateCommentInput } from "../dtos/input/comment.input.js";
import { CommentService } from "../services/comment.service.js";
import { GqlUser } from "../graphql/decorators/user.decorator.js";
import type { User } from "../generated/prisma/client.js";
import { IdeaModel } from "../models/idea.model.js";
import { IdeaService } from "../services/idea.service.js";
import type { UserModel } from "../models/user.model.js";
import { UserService } from "../services/user.service.js";

@Resolver(() => CommentModel)
export class CommentResolver {
    private commentService = new CommentService()
    private ideaService = new IdeaService()
    private userService = new UserService()

    @Mutation(() => CommentModel)
    async createComment(
        @Arg('data', () => CreateCommentInput)data: CreateCommentInput,
        @GqlUser() user: User,
        @Arg("ideaId", () => String)ideaId: string,
    ): Promise<CommentModel> {
        return this.commentService.create(ideaId, user.id, data)
    }

    @FieldResolver(() => IdeaModel)
    async idea(@Root() comment: CommentModel): Promise<IdeaModel> {
        return this.ideaService.findIdeaById(comment.ideaId)
    }

    @FieldResolver(() => IdeaModel)
    async author(@Root() comment: CommentModel): Promise<UserModel> {
        return this.userService.findUser(comment.authorId)
    }
}