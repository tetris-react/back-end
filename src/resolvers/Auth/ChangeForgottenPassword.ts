import { ChangePasswordInput } from "./../../inputs/ChangePasswordInput";
import { redis } from "./../../redis";
import { forgotPasswordPrefix } from "./../../nodemailer/prefixes";
import { logger } from "./../../middleware/logger";
import { ExpressContext, ApiResponse } from "./../../types/index";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";

@Resolver()
export class ChangeForgottenPasswordResolver {
  @UseMiddleware(logger)
  @Mutation(() => ApiResponse, { nullable: true })
  async changeForgottenPassword(
    @Arg("data")
    { token, password }: ChangePasswordInput,
    @Ctx() ctx: ExpressContext
  ): Promise<ApiResponse> {
    const userId = await redis.get(forgotPasswordPrefix + token);

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return {
        message: "Token has expired. 💀",
        status: false,
      };
    }

    if (password.length < 6) {
      return {
        message: "Password is too short. 🕹",
        status: false,
      };
    } else {
      user.password = await bcrypt.hash(password, 12);

      await redis.del(forgotPasswordPrefix + token);

      await user.save();

      ctx.req.session!.userId = user.id;
      ctx.req.session!.email = user.email;
      ctx.req.session!.isAdmin = user.isAdmin;

      return {
        message: "Password successfully changed! 🔥",
        status: true,
      };
    }
  }
}
