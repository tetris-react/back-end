import { MiddlewareFn } from "type-graphql";

import { ExpressContext } from "../types/ExpressContext";

export const logger: MiddlewareFn<ExpressContext> = async ({ args }, next) => {
  console.log("args: ", args);

  return next();
};
