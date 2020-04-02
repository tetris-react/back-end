import { ExpressContext } from "./../../types/index";
import { User } from "../../entity/User";
import { RegisterInput } from "../../inputs/RegisterInput";
import { logger, isAuth } from "../../middleware";
import {
  Resolver,
  UseMiddleware,
  Query,
  Mutation,
  Arg,
  Ctx,
} from "type-graphql";
import bcrypt from "bcryptjs";

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return "Hello, world!";
  }

  @UseMiddleware(logger)
  @Mutation(() => User)
  async register(
    @Arg("data")
    {
      email,
      username,
      password,
      tzAbv,
      tzName,
      isPrivate,
      isAdmin,
    }: RegisterInput,
    @Ctx() ctx: ExpressContext
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      tzAbv,
      tzName,
      isPrivate,
      isAdmin,
    }).save();

    ctx.req.session!.userId = user.id;
    ctx.req.session!.isAdmin = user.isAdmin;

    return user;
  }
}
