import { isAuth } from "./../../middleware/isAuth";
import { ExpressContext, ApiResponse } from "./../../types/index";
import { User } from "./../../entity/User";
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";

@Resolver()
export class ChangeEmailResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => ApiResponse, { nullable: true })
  async changeEmail(
    @Arg("email")
    email: string,
    @Ctx() ctx: ExpressContext
  ): Promise<ApiResponse> {
    const user = await User.findOne(ctx.req.session!.userId);

    if (!user) {
      return {
        message: "Could not find user. 🤷‍♂",
        status: false,
      };
    }

    user.email = email;

    await user.save();

    return {
      message: `Email successfully changed to ${email}! 🔥`,
      status: true,
    };
  }
}
