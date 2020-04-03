import { isAuth } from "../../middleware/isAuth";
import { ExpressContext, ApiResponse } from "../../types/index";
import { User } from "../../entity/User";
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";

@Resolver()
export class ChangeCountryResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => ApiResponse, { nullable: true })
  async changeCountry(
    @Arg("country")
    country: string,
    @Ctx() ctx: ExpressContext
  ): Promise<ApiResponse> {
    const user = await User.findOne(ctx.req.session!.userId);

    if (!user) {
      return {
        message: "Could not find user. 🤷‍♂",
        status: false,
      };
    }

    user.country = country;

    await user.save();

    return {
      message: `Country successfully changed to ${country}! 🔥`,
      status: true,
    };
  }
}
