import { buildSchema } from "type-graphql";

export const createSchema = () =>
  buildSchema({
    resolvers: [__dirname + "/resolvers/**/*.ts"],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
