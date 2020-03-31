import { createConnection } from "typeorm";

require("dotenv").config();

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: "default",
    type: "postgres",
    url: process.env.HEROKU_POSTGRESQL_MAUVE_URL,
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + "/../src/entity/*.*"],
    extra: {
      ssl: process.env.SSL || false,
    },
  });
};
