import { createConnection } from "typeorm";

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "tetris_player",
    password: "password",
    database: "test_database",
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + "/../src/entity/*.*"],
  });
};
