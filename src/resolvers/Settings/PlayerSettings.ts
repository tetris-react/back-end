import { TimezoneInput } from "../../inputs/TimezoneInput";
import { isAuth } from "../../middleware/isAuth";
import { ExpressContext, ApiResponse } from "../../types/index";
import { User } from "../../entity/User";
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import bcrypt from "bcryptjs";

@Resolver()
export class UserSettingsResolvers {
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
