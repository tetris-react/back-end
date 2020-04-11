import { Query, Resolver, UseMiddleware } from 'type-graphql';
import { GameRecord } from '../../entity/GameRecord';
import { logger } from '../../middleware';

@Resolver()
export class LoginResolver {
  @UseMiddleware(logger)
  @Query(() => [GameRecord])
  async leaderBoard(): Promise<GameRecord[]> {
    const records: GameRecord[] = await GameRecord.find({
      where: { isPrivate: false }
    });

    records.sort((a, b) => b.score - a.score);

    return records;
  }
}
