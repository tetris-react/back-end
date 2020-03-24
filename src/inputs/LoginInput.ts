import { PasswordInput } from "./PasswordInput";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput extends PasswordInput {
  @Field()
  username: string;
}
