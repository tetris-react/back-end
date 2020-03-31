import { ExpressContext } from "../../types";
import { User } from "../../entity/User";
import { isAuth } from "../../middleware/isAuth";
import { Resolver, UseMiddleware, Query, Ctx } from "type-graphql";

@Resolver()
export class CurrentUserResolver {
  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() ctx: ExpressContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined;
    }

    return User.findOne(ctx.req.session!.userId);
  }
}
