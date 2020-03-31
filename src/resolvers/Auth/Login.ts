import { logger } from "../../middleware";
import bcrypt from "bcryptjs";
import { ExpressContext } from "../../types";
import { User } from "../../entity/User";
import { LoginInput } from "../../inputs/LoginInput";
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";

@Resolver()
export class LoginResolver {
  @UseMiddleware(logger)
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("data") { username, password }: LoginInput,
    @Ctx() ctx: ExpressContext
  ): Promise<User | string> {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return "User not found. 🤷‍♂";
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return "Password is not valid. 💀";
    }

    ctx.req.session!.userId = user.id;

    return user;
  }
}
