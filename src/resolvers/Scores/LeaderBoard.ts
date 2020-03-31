import { logger } from "../../middleware";
import { GameRecord } from "../../entity/GameRecord";
import { Resolver, Query, UseMiddleware } from "type-graphql";

@Resolver()
export class LoginResolver {
  @UseMiddleware(logger)
  @Query(() => [GameRecord])
  async leaderBoard(): Promise<GameRecord[]> {
    const records: GameRecord[] = await GameRecord.find({
      where: { isPrivate: false },
    });

    records.sort((a, b) => b.score - a.score);

    return records;
  }
}
