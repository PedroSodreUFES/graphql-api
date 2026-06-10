import { Field, ID, ObjectType } from "type-graphql";
import { UserModel } from "./user.model.js";
import { IdeaModel } from "./idea.model.js";

@ObjectType()
export class VoteModel {
    @Field(() => ID)
    id!: string

    @Field(() => String)
    userId!: string

    @Field(() => String)
    ideaId!: string

    @Field(() => UserModel)
    user!: UserModel 

    @Field(() => IdeaModel)
    idea!: IdeaModel

}