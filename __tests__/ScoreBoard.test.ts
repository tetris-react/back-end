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

const addGameRecordMutation = `
  mutation AddGameRecord($data: AddGameRecordInput!) {
    addGameRecord(data: $data)
    {
      id
      score
      level
      lines
      isPrivate
    }
  }
`;

const leaderBoardQuery = `
  query LeaderBoard {
    leaderBoard
    {
      score
      lines
      level
    }
  }
`;

describe("Tests score board stuff 🎲", () => {
  it("Adds game record ⌨️", async () => {
    const response = await gCall({
      source: addGameRecordMutation,
      variableValues: {
        data: {
          score: 28500,
          level: 29,
          lines: 175,
          isPrivate: false,
          userId: "1",
        },
      },
    });

    expect(response).toMatchObject({
      data: {
        addGameRecord: {
          id: "1",
          score: 28500,
          level: 29,
          isPrivate: false,
        },
      },
    });

    await gCall({
      source: addGameRecordMutation,
      variableValues: {
        data: {
          score: 29000,
          level: 29,
          lines: 190,
          isPrivate: true,
          userId: "1",
        },
      },
    });

    await gCall({
      source: addGameRecordMutation,
      variableValues: {
        data: {
          score: 27000,
          level: 27,
          lines: 170,
          isPrivate: false,
          userId: "1",
        },
      },
    });
  });

  it("Gets leader board 🌰", async () => {
    const response = await gCall({
      source: leaderBoardQuery,
    });

    expect(response).toMatchObject({
      data: {
        leaderBoard: [
          {
            score: 28500,
            level: 29,
            lines: 175,
          },
          {
            score: 27000,
            level: 27,
            lines: 170,
          },
        ],
      },
    });
  });
});
