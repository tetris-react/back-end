import { User } from "./../entity/User";
import { Request, Response } from "express";
import { ObjectType, Field } from "type-graphql";

export interface ExpressContext {
  req: Request;
  res: Response;
}

@ObjectType()
export class ApiResponse {
  @Field()
  message: string;

  @Field()
  status: boolean;
}

@ObjectType()
export class AuthResponse extends ApiResponse {
  @Field(() => User, { nullable: true })
  user: User | null;
}
