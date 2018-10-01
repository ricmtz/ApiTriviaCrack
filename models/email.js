
class Email {
    constructor({
        id, idUser, email, deleted,
    }) {
        this.id = id;
        this.idUser = idUser;
        this.email = email;
        this.deleted = deleted;
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

    getDeleted() {
        return this.deleted;
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

    setDeleted(deleted) {
        this.deleted = deleted;
    }
}

module.exports = Email;
