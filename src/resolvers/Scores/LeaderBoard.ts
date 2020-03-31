import { logger } from "../../middleware";
import { Score } from "../../entity/Score";
import { Resolver, Query, UseMiddleware } from "type-graphql";

@Resolver()
export class LoginResolver {
  @UseMiddleware(logger)
  @Query(() => [Score])
  async leaderBoard(): Promise<Score[]> {
    const scores: Score[] = await Score.find({
      where: { isPrivate: false },
    });

    scores.sort((a, b) => b.value - a.value);

    return scores;
  }
}
