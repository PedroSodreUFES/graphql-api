import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "../models/user.model.js";
import { UserService } from "../services/user.service.js";
import { isAuth } from "../middleware/auth.middleware.js";

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
}