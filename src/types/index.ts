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
