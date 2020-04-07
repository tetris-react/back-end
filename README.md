# React / Tetris User Auth and Score Tracking

[![Maintainability](https://api.codeclimate.com/v1/badges/bfe3e2f66db2319dbb3d/maintainability)](https://codeclimate.com/github/tetris-react/back-end/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/bfe3e2f66db2319dbb3d/test_coverage)](https://codeclimate.com/github/tetris-react/back-end/test_coverage)

**Core TechStack:**

- TypeScript
- TypeORM
- PostgresQL
- Type GraphQL
- Redis
- Express
- Apollo Server Express
- Bcrypt

## Local Startup Guide:

### Step 1:

You need to add a `.env` file with:

```
DATABASE_URL=postgres://tetris_player:password@localhost:5432/tetris_be
HEROKU_POSTGRESQL_MAUVE_URL=postgres://tetris_player:password@localhost:5432/tetris_test_be
SECRET=lksdhglef23092382efhsdof9p8whedfauiwhdgi02088234t9w3efhsx
REDIS_URL=6379
PORT=4000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
EMAIL_PASSWORD=*y2te^c7sb(*&3noU(W
FRONT_END_URL=http://localhost:3000/
```

> **Note:** Production env variables will vary. This is just the values you need to get this working locally.

### Step 2:

Install Redis:

Use the following commands to install the last version of the Redis cli:

> Do this in a new terminal from your home directory.

```
wget http://download.redis.io/redis-stable.tar.gz

tar xvzf redis-stable.tar.gz

cd redis-stable

make
```

> What is Redis? TLDR: Is a local storage that holds cookies instead of tokens and hold them on the back end instead of on the browser. At least in terms of this project. [Read the docs here!](https://redis.io/topics/quickstart)

### Step 3:

Yarn or npm install.

Then cd into the `src/` directory and run `redis-server`.

Once Redis server is running, open your repo directory in another terminal and run `yarn server`.

If everything was done correctly then your server should be successfully running on http://localhost:4000/graphql! Go to server url in browser and you should GraphQL Playground. Check out the docs tab and register your first user!

## Query examples:

#### User Authentication:

```graphql
# A user is logged in upon registration
mutation Register {
  register(
    data: {
      email: "RickyBobby@gmail.com"
      username: "RickyBobby"
      password: "password"
      country: "USA" # Nullable, Default: USA
      tzAbv: "CST" # Nullable, Default: UTC
      tzName: "America/Chicago" # Nullable, Default: UTC
      isPrivate: false # Nullable, Default: false
    }
  ) {
    id
    username
    email
    country
    tzAbv
    tzName
    isPrivate
  }
}

# Login returns success status, message and a user object
mutation Login {
  login(data: { username: "RickyBobby", password: "password" }) {
    message
    status
    user {
      id
      username
      email
      country
      tzAbv
      tzName
      isPrivate
    }
  }
}

# Get personal info and a record of the currently logged in user scores ordered by top score
query CurrentUser {
  currentUser {
    id
    username
    email
    country
    tzAbv
    tzName
    isPrivate
    records {
      id
      score
      level
      lines
      isPrivate
    }
  }
}

mutation Logout {
  logout
}
```

#### Score Board:

```graphql
# Adds a new game record to current user thats logged in.
mutation AddGameRecord {
  addGameRecord(
    data: {
      score: number
      level: number
      lines: number
      # Set isPrivate to user's isPrivate status
      # isPrivate: boolean # Nullable, Default: false
      numTetris: number # Nullable, Default: 0
      tetrisRate: number # Nullable, Default: 0
      attackPerSecond: number # Nullable, Default: 0
      attackPerMinute: number # Nullable, Default: 0
      processedPerSecond: number # Nullable, Default: 0
      processedPerMinute: number # Nullable, Default: 0
      # date: is auto-generated as a now datetime stamp
      # userId: is automatically added from current session
    }
  ) {
    id
    score
    level
    lines
    isPrivate
    numTetris
    tetrisRate
    attackPerSecond
    attackPerMinute
    processedPerSecond
    processedPerMinute
    date
    user {
      id
      username
      email
      country
      tzAbv
      tzName
      isPrivate
    }
  }
}

# Returns a list of all public scores ordered by highest score.
query LeaderBoard {
  leaderBoard {
    id
    score
    lines
    level
    isPrivate
    numTetris
    tetrisRate
    attackPerSecond
    attackPerMinute
    processedPerSecond
    processedPerMinute
    date
    user {
      id
      username
      email
      country
      tzAbv
      tzName
      isPrivate
    }
  }
}
```

#### User Settings Mutations

> Each settings query returns a response with

```graphql
# passwords must be 6 characters long or longer
mutation ChangePassword {
  changePassword(password: "newPassword") {
    message
    status
  }
}

mutation ChangeUser {
  changeUser(username: "BobbyRicky") {
    message
    status
  }
}

mutation ChangeEmail {
  changeEmail(email: "BobbyRicky@gmail.com") {
    message
    status
  }
}

mutation ChangeCountry {
  changeCountry(country: "AUS") {
    message
    status
  }
}

mutation ChangeTimezone {
  changeTimezone(data: { tzName: "America/New_York", tzAbv: "EST" }) {
    message
    status
  }
}
```

#### Forgot Password

```graphql
mutation ForgotPassword {
  forgotPassword(email: "RickyBobby@gmail.com")
}

mutation ChangeForgottenPassword {
  changeForgottenPassword(
    data: {
      token: "65765433-7d36-44a1-b401-7e36e064c310"
      password: "newestPassword"
    }
  ) {
    message
    status
  }
}
```
