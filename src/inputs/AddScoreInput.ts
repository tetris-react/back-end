import { Field, InputType } from "type-graphql";

@InputType()
export class AddScoreInput {
  @Field()
  value: number;

  @Field()
  level: number;

  @Field()
  rowsCleared: number;

  @Field()
  isPrivate: boolean;

  @Field()
  userId: string;
}
