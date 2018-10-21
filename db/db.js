const pgp = require('pg-promise')({
    capSQL: true,
});
require('dotenv').config();

const CHECK_DELETED_ENTRIES = true;
const DEFAULT_LOG_OP = ' AND ';
const REG_PER_PAGE = 10;
const DEFAULT_PAGE = 1;

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

    selectQuery(table, conditions = null, del = false, columns = [], page = DEFAULT_PAGE,
        logOp = DEFAULT_LOG_OP, colOrd = 'id') {
        return pgp.as.format('SELECT $<cols^> FROM $<tab#> $<where^> ORDER BY $<ord^> LIMIT $<lim#> OFFSET $<off#>',
            {
                cols: this.getColsQuery(columns),
                tab: table,
                where: this.getWhere(conditions, logOp, del),
                ord: colOrd,
                lim: REG_PER_PAGE,
                off: (page - 1) * REG_PER_PAGE,
            });
    }

    insertQuery(table, data) {
        return pgp.helpers.insert(data, null, table);
    }

    updateQuery(table, data, conditions, logOp = DEFAULT_LOG_OP) {
        return `${pgp.helpers.update(data, null, table)} ${this.getWhere(conditions, logOp)}`;
    }

    deleteQuery(table, conditions) {
        return this.updateQuery(table, { deleted: true }, conditions);
    }

    getWhere(conditions, logOp, deleted = false) {
        if (!conditions) {
            return '';
        }

        const conds = conditions;
        if (!deleted) {
            conds.deleted = false;
        }
        return `WHERE ${pgp.helpers.sets(conds).replace(',', logOp)}`;
    }

    getColsQuery(cols) {
        return (cols && cols.length) ? pgp.helpers.ColumnSet(cols).names : '*';
    }

    async countRegs(table) {
        return new Promise((resolve, reject) => {
            this.db.one(pgp.as.format('SELECT count(*) FROM $<tab#>', {
                tab: table,
            })).then(res => resolve(Number(res.count)))
                .catch(err => reject(err));
        });
    }

    async validatePage(table, page) {
        if (!page) {
            return Promise.resolve();
        }

        let regsNum = null;

        await this.countRegs(table)
            .then((res) => { regsNum = res; })
            .catch(err => Promise.reject(err));

        if ((page - 1) * REG_PER_PAGE > regsNum) {
            return Promise.reject(new Error('Page out of range'));
        }

        return Promise.resolve();
    }

    async exists(table, conditions, deleted = CHECK_DELETED_ENTRIES) {
        return new Promise((resolve, reject) => {
            if (!table) {
                reject(new Error('Table name is undefined'));
            }

            this.db.one(this.selectQuery(table, conditions, deleted))
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    async select(table, conditions = null, columns = [], page) {
        await this.validatePage(table, page).catch(err => Promise.reject(err));
        return new Promise((resolve, reject) => {
            this.db.many(this.selectQuery(table, conditions, false, columns, page))
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    async insert(table, data) {
        return new Promise((resolve, reject) => {
            this.db.none(this.insertQuery(table, data))
                .then(res => resolve(res))
                .catch(e => reject(e));
        });
    }

    async update(table, data, conditions) {
        return new Promise((resolve, reject) => {
            this.db.none(this.updateQuery(table, data, conditions))
                .then(res => resolve(res))
                .catch(e => reject(e));
        });
    }

    async delete(table, conditions) {
        if (!conditions) {
            return Promise.reject(new Error(`Deletion of all ${table} is not supported`));
        }

        return new Promise((resolve, reject) => {
            this.db.none(this.deleteQuery(table, conditions))
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }
}

module.exports = new DB();
