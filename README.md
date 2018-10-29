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
- [Data base creation]()
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

## Data base creation
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
