import "reflect-metadata";

require("dotenv").config();

import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

import { redis } from "./redis";

const app = Express();

const RedisStore = connectRedis(session);

const ormConnection = async () => {
  await createConnection({
    name: "default",
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: ["src/entity/*.*"],
    extra: {
      ssl: process.env.SSL || false,
    },
  });
};

const sessionOptions = {
  store: new RedisStore({
    client: redis as any,
  }),
  name: "qid",
  secret: String(process.env.SECRET),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
  },
};

const message = `Server running on http://localhost:${process.env.PORT}/graphql 🚀`;

const main = async () => {
  ormConnection();

  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/**/*.ts"],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
  });

  app.use(
    cors({
      credentials: true,
      origin: process.env.CORS_ORIGIN,
    })
  );

  app.use(session(sessionOptions));

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT, () => {
    console.log(message);
  });
};

main();
