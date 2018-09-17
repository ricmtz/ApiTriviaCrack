const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const questionsUser = require('./routes/questions_users');
const gamesQuestionsRouter = require('./routes/games_questions');
const questionsRouter = require('./routes/questions');
const games = require('./routes/games');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(usersRouter);
app.use(categoriesRouter);
app.use(questionsUser);
app.use(gamesQuestionsRouter);
app.use(questionsRouter);
app.use(games);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
