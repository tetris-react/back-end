import { PasswordInput } from "./PasswordInput";
import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { DoesUsernameAlreadyExist } from "./validators/doesUsernameExist";

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 255)
  @DoesUsernameAlreadyExist({ message: "Username already in use, dude! 💩" })
  username: string;

  @Field()
  @IsEmail()
  email: string;
}
