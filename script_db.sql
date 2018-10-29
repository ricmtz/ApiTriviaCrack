
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

CREATE TABLE categories
(
    id SERIAL,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    icon TEXT DEFAULT ''::TEXT,
    deleted BOOLEAN DEFAULT false,
    CONSTRAINT categories_pkey PRIMARY KEY (id)
);

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
