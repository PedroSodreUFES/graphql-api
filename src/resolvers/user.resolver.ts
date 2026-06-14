import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "../models/user.model.js";
import { UserService } from "../services/user.service.js";
import { isAuth } from "../middleware/auth.middleware.js";
import { CreateUserInput } from "../dtos/input/user.input.js";

@Resolver(() => UserModel)
export class UserResolver {
    private userService = new UserService()
    
    @Query(() => UserModel)
    @UseMiddleware(isAuth)
    async getUser(
        @Arg('id', () => String) id: string
    ): Promise<UserModel> {
        return this.userService.findUser(id)
    }

    @Query(() => [UserModel])
    @UseMiddleware(isAuth)
    async listUsers(): Promise<UserModel[]> {
        return this.userService.listUser()
    }

    @Mutation(() => UserModel)
    async createUser(
        @Arg('data', () => CreateUserInput)data: CreateUserInput
    ):Promise<UserModel> {
        return this.userService.createUser(data)
    }
}