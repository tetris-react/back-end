import { PasswordInput } from "./PasswordInput";
import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { DoesUsernameAlreadyExist } from "./validators/doesUsernameExist";

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 255)
  @DoesUsernameAlreadyExist({ message: "Username already in use, dude! 💩" })
  username: string;

  @Field({ nullable: true })
  // @IsEmail()
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
