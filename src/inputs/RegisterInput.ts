import { PasswordInput } from "./PasswordInput";
import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { DoesFieldAlreadyExist } from "./validators/doesFieldExist";

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 255)
  @DoesFieldAlreadyExist({ message: "Username already in use, dude! 💩" })
  username: string;

  @Field()
  @IsEmail()
  // @DoesFieldAlreadyExist({ message: "Email already in use, dude! 💩" })
  email: string;
}
