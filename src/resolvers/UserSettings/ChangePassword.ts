import { isAuth } from "./../../middleware/isAuth";
import { ExpressContext, ApiResponse } from "./../../types/index";
import bcrypt from "bcryptjs";
import { User } from "./../../entity/User";
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";

@Resolver()
export class ChangePasswordResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => ApiResponse, { nullable: true })
  async changePassword(
    @Arg("password")
    password: string,
    @Ctx() ctx: ExpressContext
  ): Promise<ApiResponse> {
    const user = await User.findOne(ctx.req.session!.userId);

    if (!user) {
      return {
        message: "Could not find user. 🤷‍♂",
        status: false,
      };
    }

    user.password = await bcrypt.hash(password, 12);

    await user.save();

    console.log(password.length);

    if (password.length <= 6) {
      return {
        message: "Password is too short. 🕹",
        status: false,
      };
    } else {
      return {
        message: "Password successfully changed! 🔥",
        status: true,
      };
    }
  }
}
