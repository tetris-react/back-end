import { User } from "../../entity/User";
import { RegisterInput } from "../../inputs/RegisterInput";
import { logger, isAuth } from "../../middleware";
import { Resolver, UseMiddleware, Query, Mutation, Arg } from "type-graphql";
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
    { email, username, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }
}
