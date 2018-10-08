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
        this.select = this.select.bind(this);
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

    getValuesAssing(data, extra) {
        return new Promise((resolve) => {
            const columnsArr = Object.keys(data);
            const valuesArr = Object.values(data);
            this.values = '';
            for (let i = 0; i < valuesArr.length; i += 1) {
                if (i !== 0) this.values += extra;
                let valueAdd = '';
                if (isNaN(valuesArr[i])) valueAdd = `'${valuesArr[i]}'`;
                else valueAdd = `${valuesArr[i]}`;
                this.values += ` ${columnsArr[i]} = ${valueAdd}`;
            }
            resolve(this.values);
        });
    }

    getValues(data) {
        return new Promise((resolve) => {
            const valuesArr = Object.values(data);
            this.values = '';
            for (let i = 0; i < valuesArr.length; i += 1) {
                if (i !== 0) this.values += ', ';
                if (isNaN(valuesArr[i])) this.values += `'${valuesArr[i]}'`;
                else this.values += `${valuesArr[i]}`;
            }
            resolve(this.values);
        });
    }

    async select(table, columns = [], conditions = null, distinct = false) {
        if (table === undefined) return 'Error: table name is undefined';
        let col = '*';
        let dis = '';
        let cond = '';
        if (columns.length !== 0) col = columns.toString();
        if (distinct) dis = 'DISTINCT';
        if (conditions !== null) {
            const where = await this.getValuesAssing(conditions, ' AND ');
            cond = `WHERE ${where}`;
        }
        const query = `SELECT ${dis} ${col} FROM ${table} ${cond} `;
        this.values = '';
        return new Promise((resolve, reject) => {
            this.db.query(query)
                .then(res => resolve(res))
                .catch(e => reject(e.stack));
        });
    }

    async insert(table, data) {
        const columns = Object.keys(data).toString();
        const values = await this.getValues(data);
        const query = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
        this.values = '';
        return new Promise((resolve, reject) => {
            this.db.query(query)
                .then(res => resolve(res))
                .catch(e => reject(e.stack));
        });
    }

    async update(table, data, conditions) {
        const values = await this.getValuesAssing(data, ', ');
        let cond = '';
        if (conditions !== null) {
            const where = await this.getValuesAssing(conditions, ' AND ');
            cond = `WHERE ${where}`;
        }
        const query = `UPDATE ${table} SET ${values} ${cond}`;
        this.values = '';
        return new Promise((resolve, reject) => {
            this.db.query(query)
                .then(res => resolve(res))
                .catch(e => reject(e.stack));
        });
    }
}

module.exports = new DB();
