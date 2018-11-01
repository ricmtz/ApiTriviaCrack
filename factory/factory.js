const faker = require('faker');
const {
    User, Game,
    Question, Answer,
} = require('../models');

class Factory {
    static createUser() {
        const data = {
            nickname: faker.internet.userName().replace('.', '_'),
            password: faker.internet.password().replace('_', ''),
            email: faker.internet.email(),
            admin: false,
            score: faker.random.number(),
            avatar: faker.internet.avatar(),
            deleted: false,
            verified: true,
        };
        return new User(data);
    }

    static createEmail(userid) {
        const data = {
            userid,
            email: faker.internet.email(),
            deleted: false,
        };
        return data;
    }

    static createFriend(user1, user2) {
        const data = {
            user1,
            user2,
            friendshipdate: new Date(),
            deleted: false,
        };
        return data;
    }

    static createGame(player1, player2) {
        const data = {
            player1,
            player2,
            scoreplayer1: Math.floor(Math.random() * 10),
            scoreplayer2: Math.floor(Math.random() * 10),
            createdate: new Date(),
            finished: true,
            deleted: false,
        };
        return new Game(data);
    }

    static createQuestion(category, userid) {
        const data = {
            category,
            question: faker.lorem.paragraph(),
            option1: faker.random.word(),
            option2: faker.random.word(),
            optioncorrect: faker.random.word(),
            approved: true,
            deleted: false,
            userid,
            createdate: new Date(),
            approveddate: new Date(),
        };
        return new Question(data);
    }

    static createAnswer(game, question, player) {
        const data = {
            game,
            question,
            player,
            option: faker.random.word(),
            correct: faker.random.boolean(),
            deleted: false,
        };
        return new Answer(data);
    }
}

module.exports = Factory;
