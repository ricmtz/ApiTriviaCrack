
class Email {
    constructor({ id, idUser, email }) {
        this.id = id;
        this.idUser = idUser;
        this.email = email;
    }

    getId() {
        return this.id;
    }

    getIdUser() {
        return this.idUser;
    }

    getEmail() {
        return this.email;
    }

    setId(id) {
        this.id = id;
    }

    setIdUser(idUser) {
        this.idUser = idUser;
    }

    setEmail(email) {
        this.email = email;
    }
}

module.exports = Email;
