import { Field, InputType } from "type-graphql";

@InputType()
export class AddGameRecordInput {
  @Field()
  score: number;

  @Field()
  level: number;

  @Field()
  lines: number;

  @Field({ nullable: true })
  numTetris: number;

  @Field({ nullable: true })
  tetrisRate: number;

  @Field({ nullable: true })
  attackPerSecond: number;

  @Field({ nullable: true })
  attackPerMinute: number;

  @Field({ nullable: true })
  processedPerSecond: number;

  @Field({ nullable: true })
  processedPerMinute: number;

  @Field({ nullable: true })
  date: string;

  @Field({ nullable: true })
  isPrivate: boolean;
}
