import { PasswordInput } from "./PasswordInput";
import { Field, InputType } from "type-graphql";
import { DoesUsernameAlreadyExist } from "./validators/doesUsernameExist";
import { DoesEmailAlreadyExist } from "./validators/doesEmailExist";
import { IsThatReallyAnEmail } from "./validators/isThatAnEmail";
import { UsernamePresence } from "./validators/isUsernamePresent";

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @UsernamePresence({ message: "You forgot to put in a username, dude. 😒" })
  @DoesUsernameAlreadyExist({
    message: "That username is already in use, dude! 💩",
  })
  username: string;

  @Field({ nullable: true })
  @IsThatReallyAnEmail({
    message: "I'm not gunna lie, I don't think that's a real email. 🛑",
  })
  @DoesEmailAlreadyExist({ message: "That email is already in use, dude! 💩" })
  email: string;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  tzAbv: string;

  @Field({ nullable: true })
  tzName: string;

  @Field({ nullable: true })
  isPrivate: boolean;

  @Field({ nullable: true })
  isAdmin: boolean;
}
