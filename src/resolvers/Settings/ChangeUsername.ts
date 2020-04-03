import { isAuth } from "../../middleware/isAuth";
import { ExpressContext, ApiResponse } from "../../types/index";
import { User } from "../../entity/User";
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";

@Resolver()
export class ChangeUsernameResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => ApiResponse, { nullable: true })
  async changeUsername(
    @Arg("username")
    username: string,
    @Ctx() ctx: ExpressContext
  ): Promise<ApiResponse> {
    const user = await User.findOne(ctx.req.session!.userId);

    if (!user) {
      return {
        message: "Could not find user. 🤷‍♂",
        status: false,
      };
    }

    user.username = username;

    await user.save();

    return {
      message: `Username successfully changed to ${username}! 🔥`,
      status: true,
    };
  }
}
