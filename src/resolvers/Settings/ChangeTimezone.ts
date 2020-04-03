import { TimezoneInput } from "../../inputs/TimezoneInput";
import { isAuth } from "../../middleware/isAuth";
import { ExpressContext, ApiResponse } from "../../types/index";
import { User } from "../../entity/User";
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";

@Resolver()
export class ChangeTimezoneResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => ApiResponse, { nullable: true })
  async changeTimezone(
    @Arg("data")
    { tzName, tzAbv }: TimezoneInput,
    @Ctx() ctx: ExpressContext
  ): Promise<ApiResponse> {
    const user = await User.findOne(ctx.req.session!.userId);

    if (!user) {
      return {
        message: "Could not find user. 🤷‍♂",
        status: false,
      };
    }

    user.tzName = tzName;
    user.tzAbv = tzAbv;

    await user.save();

    return {
      message: `Timezone successfully changed to ${tzName} (${tzAbv})! 🔥`,
      status: true,
    };
  }
}
