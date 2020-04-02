import { PasswordInput } from "./PasswordInput";
import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { DoesUsernameAlreadyExist } from "./validators/doesUsernameExist";
import { DoesEmailAlreadyExist } from "./validators/doesEmailExist";

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 255)
  @DoesUsernameAlreadyExist({ message: "Username already in use, dude! 💩" })
  username: string;

  @Field()
  @IsEmail()
  @DoesEmailAlreadyExist({ message: "Email already in use, dude! 💩" })
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
