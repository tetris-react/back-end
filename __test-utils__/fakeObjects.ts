import faker from "faker";

interface FakeUserObject {
  username: string;
  email: string;
  password: string;
}

interface FakeScoreObject {
  value: number;
  level: number;
  rowsCleared: number;
  userId: string;
}

export const fakeUser: FakeUserObject = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

export const fakeScore: FakeScoreObject = {
  value: faker.random.number(50000),
  level: faker.random.number(30),
  rowsCleared: faker.random.number(300),
  userId: "1",
};
