import { Connection } from "typeorm";

import { gCall } from "../test-utils/gCall";
import { testConn } from "../test-utils/testConn";
import { User } from "./../src/entity/User";

import faker from "faker";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const fakeUser = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

const registerMutation = `
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      username
      email
    }
  }
`;

describe("User registration 📔", () => {
  it("Creates a new user 🔥", async () => {
    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: fakeUser,
      },
    });

    expect(response).toMatchObject({
      data: {
        register: {
          username: fakeUser.username,
          email: fakeUser.email,
        },
      },
    });

    const dbUser = await User.findOne({
      where: {
        username: fakeUser.username,
      },
    });

    expect(dbUser).toBeDefined();
    expect(dbUser!.username).toBe(fakeUser.username);
    expect(dbUser!.email).toBe(fakeUser.email);
  });
});
