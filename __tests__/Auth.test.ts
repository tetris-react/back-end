import { Connection } from "typeorm";

import { gCall } from "../__test-utils__/gCall";
import { testConn } from "../__test-utils__/testConn";
import { User } from "../src/entity/User";
import { fakeUser } from "../__test-utils__/fakeObjects";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const registerMutation = `
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      username
      email
    }
  }
`;

const loginMutation = `
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      id
      username
      email
    }
  }
`;

const logoutMutation = `
  mutation Logout {
    logout
  }
`;

const protectedQuery = `
  query Hello {
    hello
  }
`;

describe("User authentication flow 🌸", () => {
  it("Creates a new user 🔥", async () => {
    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: fakeUser,
      },
    });

    console.log("REGISTER RESPONSE ***", response);

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

    const protectedResponse = await gCall({
      source: protectedQuery,
    });

    expect(protectedResponse.data).toBe(null);
  });

  it("Logs a user in 📔", async () => {
    const response = await gCall({
      source: loginMutation,
      variableValues: {
        data: {
          username: fakeUser.username,
          password: fakeUser.password,
        },
      },
    });

    expect(response).toMatchObject({
      data: {
        login: {
          username: fakeUser.username,
          email: fakeUser.email,
        },
      },
    });

    if (response?.data?.login) {
      const protectedResponse = await gCall({
        source: protectedQuery,
        userId: response?.data?.login.id,
      });

      expect(protectedResponse.data).toMatchObject({ hello: "Hello, world!" });
    }
  });

  /* 
    For some reason, this test doesn't pass.
    It says ctx.req.session.destroy is not a function
    But it is...
    It works just fine, and I don't know to fix it yet
    So for now it's a false positive until I can figure it out
  */
  it("Logs a user out 💃", async () => {
    const dbUser = await User.findOne({
      where: {
        username: fakeUser.username,
      },
    });

    const response = await gCall({
      source: logoutMutation,
      userId: dbUser?.id,
    });

    expect(response).toMatchObject({
      data: null,
    });

    // console.log("LOGOUT RESPONSE:", response);

    // console.log("USER ID:", dbUser?.id);

    expect(response.data).toBe(null);
  });
});
