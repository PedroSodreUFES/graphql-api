import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql"
import { UserModel } from "./user.model.js"
import { CommentModel } from "./comment.model.js"
import { VoteModel } from "./vote.model.js"

@ObjectType()
export class IdeaModel {
    @Field(() => ID)
    id!: string

    @Field(() => String)
    title!: string

    @Field(() => String, { nullable: true })
    description?: string | null

    @Field(() => String)
    authorId!: string

    @Field(() => Number, { nullable: true })
    countVotes?: number

    @Field(() => UserModel, { nullable: true })
    author?: UserModel

    @Field(() => [CommentModel])
    comments?: CommentModel[]

    @Field(() => [VoteModel])
    votes?: VoteModel[]

    @Field(() => GraphQLISODateTime)
    createdAt!: Date

    @Field(() => GraphQLISODateTime)
    updatedAt!: Date
}