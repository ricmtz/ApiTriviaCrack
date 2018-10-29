<div align="center">
  <h1>ApiTriviaCrack</h1>
  <a href="https://www.npmjs.com/package/eslint-config-airbnb">
    <img src="https://img.shields.io/badge/eslint--airbnb-17.1.0-brightgreen.svg?longCache=true&style=for-the-badge">
  </a>
  <a href="https://www.npmjs.com/package/express">
    <img src="https://img.shields.io/badge/express-4.16.3-blue.svg?longCache=true&style=for-the-badge">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-red.svg?longCache=true&style=for-the-badge">
  </a>
</div>

## Table of contents
- [Description](#description)
- [Modules](#modules)
- [Installation](#installation)
- [Data base creation](#data-base-creation)
- [Demo URL](#demo-url)
- [App URL](#app-url)
- [Collaborators](#collaborators)

## Description
ApiTriviaCrack is a web-app where users answer questions from multiple programming topics, competing against other users in duels.

## Modules
* __Users__: Represents a player or admin, who has a unique nickname and a global score, can play games and submit questions.
  * __Friends__: Users can add friends to easily start duels.
  * __Emails__: Users can have multiple emails besides a main one.
* __Games__: Based on duels between friends or random players, each game consists of 10 randomly selected questions per player (not necessarily the same questions).
  * __GamesQuestions__: Each of the questions is assigned to a player and it stores the
    answer and whether or not it is correct.
* __Questions__: Each question can have three options, only one being the correct one.
Questions are related to the user that submitted it, and whether or not it has been approved.
  * __Categories__: Questions are selected based on the category they fall on.

## Installation
### Dependencies:
### [Git][GitLink]
```sh
$ sudo apt-get install git-core
```

### [NVM][NvmLink]
```sh
$ curl https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash
```

### [Node][NodeLink]
```sh
$ nvm install node
```


### Get the sources:
```sh
$ git clone https://github.com/ricmtz/ApiTriviaCrack.git
```

### Install node dependencies:
```sh
$ npm install
```

### Run the app:
```sh
$ node index.js
```

### Setting up the .env file
```env
DB_HOST=localhost
DB_NAME=namedbapi
DB_USER=userdbapi
DB_PORT=7777
DB_PASSWORD=sampledbpassword
PORT=3000
SESSION_TIME=5
SALT_ROUNDS=15
SECRET=sampleSecret
MAIL_HOST=smtp.ethereal.email
MAIL_PORT=587
MAIL_USER=sampleaccount@ethereal.email
MAIL_PASS=samplepasswordetheral
```

## Data base creation
This application has a data base implementation based on [PostgreSQL](https://www.postgresql.org/).
The following scripts describe the estructure of all the data base tables.

### Users table.
```sql
CREATE TABLE users
(
    id SERIAL,
    nickname TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    score INTEGER DEFAULT 0,
    avatar TEXT DEFAULT ''::TEXT,
    lastlogin TIMESTAMP,
    deleted BOOLEAN DEFAULT false,
    admin BOOLEAN DEFAULT false,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_nickname_key UNIQUE (nickname),
    CONSTRAINT users_principal_email_key UNIQUE (email)
);
```

### Emails table.
```sql
CREATE TABLE emails
(
    id SERIAL,
    userid INTEGER,
    email TEXT,
    deleted BOOLEAN DEFAULT false,
    CONSTRAINT emails_email_key UNIQUE (email),
    CONSTRAINT emails_id_user_fkey FOREIGN KEY (userid)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
```

### Friends table.
```sql
CREATE TABLE friends
(
    id SERIAL,
    user1 INTEGER NOT NULL,
    user2 INTEGER NOT NULL,
    friendshipdate TIMESTAMP NOT NULL,
    deleted BOOLEAN DEFAULT false,
    CONSTRAINT friends_pkey PRIMARY KEY (id),
    CONSTRAINT friends_id_user_1_fkey FOREIGN KEY (user1)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT friends_id_user_2_fkey FOREIGN KEY (user2)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
```

### Games table.
``` sql
CREATE TABLE games
(
    id SERIAL,
    player1 INTEGER,
    player2 INTEGER,
    scoreplayer1 INTEGER DEFAULT '-1'::INTEGER,
    scoreplayer2 INTEGER DEFAULT '-1'::INTEGER,
    createdate TIMESTAMP NOT NULL,
    finished BOOLEAN DEFAULT false,
    deleted BOOLEAN DEFAULT false,
    CONSTRAINT games_pkey PRIMARY KEY (id),
    CONSTRAINT games_player_1_fkey FOREIGN KEY (player1)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT games_player_2_fkey FOREIGN KEY (player2)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
```

### Categories table.
```sql
CREATE TABLE categories
(
    id SERIAL,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    icon TEXT DEFAULT ''::TEXT,
    deleted BOOLEAN DEFAULT false,
    CONSTRAINT categories_pkey PRIMARY KEY (id)
);
```

### Questions table.
```sql
CREATE TABLE questions
(
    id SERIAL,
    category INTEGER,
    question TEXT NOT NULL,
    option1 TEXT NOT NULL,
    option2 TEXT NOT NULL,
    optioncorrect TEXT NOT NULL,
    approved BOOLEAN DEFAULT false,
    deleted BOOLEAN DEFAULT false,
    userid INTEGER,
    createdate TIMESTAMP NOT NULL,
    approveddate TIMESTAMP,
    CONSTRAINT questions_pkey PRIMARY KEY (id),
    CONSTRAINT questions_category_fkey FOREIGN KEY (category)
        REFERENCES categories (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT questions_userid_fkey FOREIGN KEY (userid)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
```
### Answers table.
```sql
CREATE TABLE answers
(
    id SERIAL,
    game INTEGER NOT NULL,
    question INTEGER NOT NULL,
    player INTEGER NOT NULL,
    option TEXT,
    correct BOOLEAN,
    deleted BOOLEAN DEFAULT false,
    CONSTRAINT answers_pkey PRIMARY KEY (id),
    CONSTRAINT answers_game_fkey FOREIGN KEY (game)
        REFERENCES games (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT answers_player_fkey FOREIGN KEY (player)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT answers_question_fkey FOREIGN KEY (question)
        REFERENCES questions (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
```

### Tokens table.
```sql
CREATE TABLE tokens
(
    id SERIAL,
    token TEXT NOT NULL,
    createdat TIMESTAMP NOT NULL,
    expires TIMESTAMP NOT NULL,
    type CHARACTER(1) NOT NULL,
    status CHARACTER(1) NOT NULL,
    userid INTEGER NOT NULL,
    CONSTRAINT tokens_pkey PRIMARY KEY (id),
    CONSTRAINT tokens_userid_fkey FOREIGN KEY (userid)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
```

## Demo URL

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/e4e893d5230a0a4cac35#?env%5Bapi%5D=W3sia2V5IjoiaG9zdCIsInZhbHVlIjoiaHR0cHM6Ly9hcGktdHJpdmlhLWNyYWNrLmhlcm9rdWFwcC5jb20iLCJkZXNjcmlwdGlvbiI6IiIsImVuYWJsZWQiOnRydWV9XQ==)


## App URL
<div align="center">
  <a href="https://api-trivia-crack.herokuapp.com/" target="_blank">
    <img src="https://png.icons8.com/color/1600/heroku.png" height="75" width="75">
  </a>
</div>

## Collaborators
<div align="center">
  <a href="https://github.com/AdiLupita">
    <img src="https://avatars2.githubusercontent.com/u/36176439?s=400&v=4" height="75" width="75" alt ="Castañeda Lozano Adriana Guadalupe">
  </a>
  <a href="https://github.com/IrvingCJ">
    <img src="https://avatars3.githubusercontent.com/u/42556654?s=400&v=4" height="75" width="75" alt="Cervantes Jiménez Irving">
  </a>
  <a href="https://github.com/ricmtz">
    <img src="https://avatars1.githubusercontent.com/u/18709420?s=400&v=4" height="75" width="75" alt="Martínez Helguera Ricardo">
  </a>
</div>

[GitLink]: https://git-scm.com/
[NvmLink]: https://github.com/creationix/nvm/blob/master/README.md
[NodeLink]: https://nodejs.org/es/
