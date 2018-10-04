const { db } = require('../db');
const { User } = require('../models');

class Users {
    constructor() {
        this.nombre = 'users';
    }

    async getAll() {
        const result = await db.select(this.nombre);
        if (result.length === 0) return result;
        const response = [];
        result.forEach((row) => {
            response.push(new User(row));
        });
        return response;
    }

    async get(idUser) {
        const result = db.select(this.nombre, [], { id: idUser });
        return result.length !== 0 ? new User(result[0]) : result;
    }

    async getNickname(nicknameUser) {
        const result = await db.select(this.nombre, [], { nickname: nicknameUser });
        return result.length !== 0 ? new User(result[0]) : result;
    }

    async create(data) {
        const user = new User(data);
        let result = await db.insert(this.nombre, user);
        result = await db.select(this.nombre, [], user);
        if (result.length !== 0) {
            return user.setId(result[0]);
        }
        return result;
    }
}

module.exports = new Users();
