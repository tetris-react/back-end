import "reflect-metadata";

require("dotenv").config();

import { ExpressContext } from "./types";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

import { redis } from "./redis";
import { createSchema } from "./createSchema";

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

interface Options {
  store: connectRedis.RedisStore;
  name: string;
  secret: string;
  resave: boolean;
  saveUninitialized: boolean;
  cookie: {
    httpOnly: boolean;
    sameSite: boolean | "none" | "lax" | "strict" | undefined;
    secure: boolean;
    maxAge: number;
  };
}

const sessionOptions: Options = {
  store: new RedisStore({
    client: redis as any,
  }),
  name: "qid",
  secret: String(process.env.SECRET),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: process.env.NODE_ENV === "development",
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
  },
};

const message = `Server running on http://localhost:${process.env.PORT}/graphql 🚀`;

const main = async () => {
  ormConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: ExpressContext) => ({ req, res }),
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
    setTimeout(
      () => console.log(message, `NODE ENV: ${process.env.NODE_ENV} 🛠`),
      500
    );
  });
};

main();
