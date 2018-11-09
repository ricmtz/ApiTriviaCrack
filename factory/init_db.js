const faker = require('faker');
const Factory = require('./factory');
const { Category, User } = require('../models');
const { db } = require('../db');
const { auth } = require('../middlewares');

async function insertData(data, table) {
    const promises = [];
    const result = [];
    for (let i = 0; i < data.length; i += 1) {
        promises.push(db.insert(table, data[i], 'id').then((res) => {
            data[i].setId(res);
            return data[i];
        }));
    }
    await Promise.all(promises)
        .then(res => result.push(res))
        .catch(() => { });
    return result[0];
}

function getRandUsers(usersLen) {
    const user1 = Math.floor(Math.random() * usersLen);
    let user2 = Math.floor(Math.random() * usersLen);
    while (user1 === user2) {
        user2 = Math.floor(Math.random() * usersLen);
    }
    // console.log(user1, user2);
    return { user1, user2 };
}

async function createCategories() {
    const categories = [
        new Category({ name: 'Web', color: 'Blue', icon: 'web.jpg' }),
        new Category({ name: 'DB', color: 'Red', icon: 'db.jpg' }),
        new Category({ name: 'History', color: 'Yellow', icon: 'history.jpg' }),
        new Category({ name: 'Programming', color: 'Green', icon: 'programming.jpg' }),
        new Category({ name: 'IA', color: 'Purple', icon: 'ia.jpg' }),
        new Category({ name: 'Algorithmics', color: 'Orange', icon: 'algorithm.jpg' }),
    ];
    let categoriesDB = null;
    await insertData(categories, 'categories')
        .then((res) => { categoriesDB = res; })
        .catch(err => console.log(err.message));
    return categoriesDB;
}

async function createToken(users) {
    const promises = [];
    for (let i = 0; i < users.length; i += 1) {
        promises.push(auth.createToken(users[i]));
    }
    Promise.all(promises)
        .catch(err => console.log(err.message));
}

async function createAdminUsers() {
    const password = await auth.hash('admin')
        .catch(err => console.log(err.message));
    const admin1 = new User({
        nickname: 'admin1',
        password,
        email: faker.internet.email(),
        admin: true,
        score: faker.random.number(),
        avatar: faker.internet.avatar(),
        deleted: false,
        verified: true,
    });
    const admin2 = new User({
        nickname: 'admin2',
        password,
        email: faker.internet.email(),
        admin: true,
        score: faker.random.number(),
        avatar: faker.internet.avatar(),
        deleted: false,
        verified: true,
    });
    let admindb = null;
    await insertData([admin1, admin2], 'users')
        .then((res) => { admindb = res; })
        .catch(err => console.log(err.message));
    return admindb;
}

async function createUsers() {
    const totalUsers = 15;
    const users = [...Array(totalUsers).keys()].map(() => Factory.createUser());
    let usersDB = null;
    await insertData(users, 'users')
        .then((res) => { usersDB = res; })
        .catch(err => console.log(err.message));
    return usersDB;
}

async function createFriends(users) {
    const totalFriends = 25;
    const friends = [];
    for (let i = 0; i < totalFriends; i += 1) {
        const { user1, user2 } = getRandUsers(users.length);
        const friend = Factory.createFriend(users[user1].getId(), users[user2].getId());
        const existFriendship = friends.find((x) => {
            const match1 = (x.user1 === friend.user1 && x.user2 === friend.user2);
            const match2 = (x.user1 === friend.user2 && x.user2 === friend.user1);
            return match1 || match2;
        });
        if (!existFriendship) {
            friends.push(friend);
        }
    }
    await insertData(friends, 'friends')
        .catch(err => console.log(err));
}

async function createEmails(users) {
    const emailsPerUser = 5;
    const emails = [];
    for (let i = 0; i < users.length; i += 1) {
        for (let j = 0; j < emailsPerUser; j += 1) {
            const email = Factory.createEmail(users[i].getId());
            const existEmail = emails.find(x => x.email === email.email);
            if (!existEmail) {
                emails.push(email);
            }
        }
    }
    await insertData(emails, 'emails')
        .catch(err => console.log(err.message));
}

async function createQuestions(categories, users) {
    const questionsPerCat = 15;
    const questions = [];
    let questionsDB = null;
    for (let i = 0; i < categories.length; i += 1) {
        for (let j = 0; j < questionsPerCat; j += 1) {
            const { user1 } = getRandUsers(users.length);
            const question = Factory.createQuestion(categories[i].getId(), users[user1].getId());
            questions.push(question);
        }
    }
    await insertData(questions, 'questions')
        .then((res) => { questionsDB = res; })
        .catch(err => console.log(err.message));
    return questionsDB;
}

async function createGames(users) {
    const totalGames = 15;
    const games = [];
    let gamesDB = null;
    for (let i = 0; i < totalGames; i += 1) {
        const { user1, user2 } = getRandUsers(users.length);
        const game = Factory.createGame(users[user1].getId(), users[user2].getId());
        games.push(game);
    }
    await insertData(games, 'games')
        .then((res) => { gamesDB = res; })
        .catch(err => console.log(err.message));
    return gamesDB;
}

async function createAnswers(games, questions) {
    const answersPerGame = 20;
    const answers = [];
    for (let i = 0; i < games.length; i += 1) {
        for (let j = 0; j < answersPerGame; j += 1) {
            let player = null;
            if (j < answersPerGame / 2) {
                player = games[i].getPlayer1();
            } else {
                player = games[i].getPlayer2();
            }
            const question = questions[Math.floor(Math.random() * questions.length)];
            const answer = Factory.createAnswer(games[i].getId(), question.getId(), player);
            const existAnswer = answers.find((x) => {
                const existGame = x.getGame() === answer.getGame();
                const existPlayer = x.getPlayer() === answer.getPlayer();
                const existQuestion = x.getQuestion() === answer.getQuestion();
                return existGame && existPlayer && existQuestion;
            });
            if (!existAnswer) {
                answers.push(answer);
            }
        }
    }
    await insertData(answers, 'answers')
        .catch(err => console.log(err.message));
}

async function generateDB() {
    console.log('Creating categories');
    const categories = await createCategories();
    console.log('Creating admin users');
    const admins = await createAdminUsers();
    await createToken(admins);
    console.log('Creating users');
    const users = await createUsers();
    await createToken(users);
    console.log('Creating friends');
    await createFriends(users);
    console.log('Creating emails');
    await createEmails(users);
    console.log('Creating questions');
    const questions = await createQuestions(categories, users);
    console.log('Creating games');
    const games = await createGames(users);
    console.log('Creating answers');
    await createAnswers(games, questions);
}

generateDB();
