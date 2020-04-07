import { ExpressContext } from "./../../types/index";
import { logger, isAuth } from "../../middleware";
import { GameRecord } from "../../entity/GameRecord";
import { User } from "../../entity/User";
import { AddGameRecordInput } from "../../inputs/AddGameRecordInput";
import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";

@Resolver()
export class AddGameRecordResolver {
  @UseMiddleware(logger, isAuth)
  @Mutation(() => GameRecord, { nullable: true })
  async addGameRecord(
    @Arg("data")
    {
      score,
      level,
      lines,
      isPrivate,
      numTetris,
      tetrisRate,
      attackPerSecond,
      attackPerMinute,
      processedPerSecond,
      processedPerMinute,
      date,
    }: AddGameRecordInput,
    @Ctx() ctx: ExpressContext
  ): Promise<any> {
    const user = await User.findOne({
      where: { id: ctx.req.session!.userId },
    });

    const record = await GameRecord.create({
      score,
      level,
      lines,
      isPrivate,
      userId: ctx.req.session!.userId,
      numTetris,
      tetrisRate,
      attackPerSecond,
      attackPerMinute,
      processedPerSecond,
      processedPerMinute,
      date: Number(date),
    }).save();

    const finalRecord = {
      ...record,
      user,
    };

    return finalRecord;
  }
}
