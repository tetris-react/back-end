import { logger } from "../../middleware";
import { Score } from "../../entity/Score";
import { User } from "../../entity/User";
import { AddScoreInput } from "../../inputs/AddScoreInput";
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

@Resolver()
export class LoginResolver {
  @UseMiddleware(logger)
  @Mutation(() => Score, { nullable: true })
  async addScore(
    @Arg("data") { value, level, rowsCleared, isPrivate, userId }: AddScoreInput
  ): Promise<any> {
    const user = await User.findOne({
      where: { id: userId },
    });

    const score = await Score.create({
      value,
      level,
      rowsCleared,
      isPrivate,
      userId,
    }).save();

    const finalScore = {
      ...score,
      user,
    };

    console.log("Final score:", finalScore);
    console.log("User:", user);

    return finalScore;
  }
}
