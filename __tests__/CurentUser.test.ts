import { Connection } from "typeorm";

import { testConn } from "../__test-utils__/testConn";
import { gCall } from "../__test-utils__/gCall";
import { User } from "../src/entity/User";
import { fakeUser } from "../__test-utils__/fakeObjects";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const currentUserQuery = `
  {
    currentUser {
      id
      username
      email
      scores {
        id
        value
        level
        rowsCleared
        isPrivate
      }
    }
  }
`;

describe("Current User 👓", () => {
  it("Gets current user 🍷", async () => {
    const user = await User.create(fakeUser).save();

    const response = await gCall({
      source: currentUserQuery,
      userId: user.id,
    });

    expect(response).toMatchObject({
      data: {
        currentUser: {
          id: `${user.id}`,
          username: user.username,
          email: user.email,
          scores: user.scores(user),
        },
      },
    });
  });

  it("returns null 💀", async () => {
    const response = await gCall({
      source: currentUserQuery,
    });

    expect(response).toMatchObject({
      data: {
        currentUser: null,
      },
    });
  });
});
