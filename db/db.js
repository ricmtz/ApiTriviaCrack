const pgp = require('pg-promise')();
require('dotenv').config();


const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: true,
};

class DB {
    constructor() {
        this.db = pgp(cn);
        this.test = this.test.bind(this);
    }

    test() {
        this.db.one('SELECT $1 AS value', 123)
            .then((data) => {
                console.log('DATA:', data.value);
            })
            .catch((error) => {
                console.log('ERROR:', error);
            });
    }
}

module.exports = new DB();
