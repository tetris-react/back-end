import { PasswordInput } from "./PasswordInput";
import { Field, InputType } from "type-graphql";
import { UsernamePresence } from "./validators/isUsernamePresent";

@InputType()
export class LoginInput extends PasswordInput {
  @Field()
  @UsernamePresence({ message: "You forgot to put in a username, dude. 😒" })
  username: string;
}
