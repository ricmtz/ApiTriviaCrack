const { db } = require('../db');

class Users {
    constructor() {
        this.nombre = 'users';
    }

    async getAll() {
        return db.select(this.nombre);
    }

    get(idUser) {
        return db.select(this.nombre, [], { id: idUser });
    }

    getNickname(nicknameUser) {
        return db.select(this.nombre, [], { nickname: nicknameUser });
    }

    create(data) {
        return db.insert(this.nombre, data);
    }
}

module.exports = new Users();
