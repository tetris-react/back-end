import { logger } from "../../middleware";
import { GameRecord } from "../../entity/GameRecord";
import { User } from "../../entity/User";
import { AddGameRecordInput } from "../../inputs/AddGameRecordInput";
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

@Resolver()
export class AddGameRecordResolver {
  @UseMiddleware(logger)
  @Mutation(() => GameRecord, { nullable: true })
  async addGameRecord(
    @Arg("data")
    {
      score,
      level,
      lines,
      isPrivate,
      userId,
      numTetris,
      tetrisRate,
      attackPerSecond,
      attackPerMinute,
      processedPerSecond,
      processedPerMinute,
      date,
    }: AddGameRecordInput
  ): Promise<any> {
    const user = await User.findOne({
      where: { id: userId },
    });

    const record = await GameRecord.create({
      score,
      level,
      lines,
      isPrivate,
      userId,
      numTetris,
      tetrisRate,
      attackPerSecond,
      attackPerMinute,
      processedPerSecond,
      processedPerMinute,
      date,
    }).save();

    const finalRecord = {
      ...record,
      user,
    };

    return finalRecord;
  }
}
