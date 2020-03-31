import { Connection } from "typeorm";

import { testConn } from "../__test-utils__/testConn";
import { gCall } from "../__test-utils__/gCall";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const addScoreMutation = `
  mutation AddScore($data: AddScoreInput!) {
    addScore(data: $data)
    {
      id
      value
      level
      rowsCleared
      isPrivate
    }
  }
`;

const leaderBoardQuery = `
  query LeaderBoard {
    leaderBoard
    {
      value
      rowsCleared
      level
    }
  }
`;

describe("Current User 👓", () => {
  it("Gets current user 🍷", async () => {
    const response = await gCall({
      source: addScoreMutation,
      variableValues: {
        data: {
          value: 28500,
          level: 29,
          rowsCleared: 175,
          isPrivate: false,
          userId: "1",
        },
      },
    });

    expect(response).toMatchObject({
      data: {
        addScore: {
          id: "1",
          value: 28500,
          level: 29,
          isPrivate: false,
        },
      },
    });

    await gCall({
      source: addScoreMutation,
      variableValues: {
        data: {
          value: 29000,
          level: 29,
          rowsCleared: 190,
          isPrivate: true,
          userId: "1",
        },
      },
    });

    await gCall({
      source: addScoreMutation,
      variableValues: {
        data: {
          value: 27000,
          level: 27,
          rowsCleared: 170,
          isPrivate: false,
          userId: "1",
        },
      },
    });
  });

  it("Gets current user 🍷", async () => {
    const response = await gCall({
      source: leaderBoardQuery,
    });

    expect(response).toMatchObject({
      data: {
        leaderBoard: [
          {
            value: 28500,
            level: 29,
            rowsCleared: 175,
          },
          {
            value: 27000,
            level: 27,
            rowsCleared: 170,
          },
        ],
      },
    });
  });
});
