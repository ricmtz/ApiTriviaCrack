const pgp = require('pg-promise')({
    capSQL: true,
});
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
    }

    async exists(table, conditions, deleted = false) {
        return new Promise((resolve, reject) => {
            this.db.many(pgp.as.format('SELECT * FROM $<tab#> $<where^>',
                {
                    tab: table,
                    where: DB.getWhere(conditions, ' AND ', deleted),
                }))
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    static getWhere(conditions, logOp, deleted = false) {
        if (!conditions) {
            return '';
        }

        const conds = conditions;
        if (!deleted) {
            conds.deleted = false;
        }
        return `WHERE ${pgp.helpers.sets(conds).replace(',', logOp)}`;
    }

    static getColsQuery(cols) {
        return (cols && cols.length) ? pgp.helpers.ColumnSet(cols).names : '*';
    }

    async select(table, columns = [], conditions = null, limit = 10, offset = 0, extra = ' AND ') {
        if (!table === undefined) {
            return Promise.reject(new Error('Table name is undefined'));
        }

        const query = pgp.as.format('SELECT $<cols^> FROM $<tab#> $<where^> LIMIT $<lim#> OFFSET $<off#>',
            {
                cols: DB.getColsQuery(columns),
                tab: table,
                where: DB.getWhere(conditions, extra),
                lim: limit,
                off: offset,
            });

        return new Promise((resolve, reject) => {
            this.db.many(query)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    async insert(table, data) {
        const query = pgp.helpers.insert(data, null, table);
        return new Promise((resolve, reject) => {
            this.db.none(query)
                .then(res => resolve(res))
                .catch(e => reject(e));
        });
    }

    async update(table, data, conditions, extra = ' AND ') {
        const query = `${pgp.helpers.update(data, null, table)} ${DB.getWhere(conditions, extra)}`;
        return new Promise((resolve, reject) => {
            this.db.none(query)
                .then(res => resolve(res))
                .catch(e => reject(e));
        });
    }

    async delete(table, conditions, extra = ' AND ') {
        if (!conditions) {
            return Promise.reject(new Error(`Deletion of all ${table} is not supported`));
        }

        const query = `${pgp.helpers.update({ deleted: true }, null, table)} ${DB.getWhere(conditions, extra)}`;
        return new Promise((resolve, reject) => {
            this.db.none(query)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }
}

module.exports = new DB();
