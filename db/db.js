const pgp = require('pg-promise')({
    capSQL: true,
});
require('dotenv').config();

const DEFAULT_LOG_OP = ' AND ';
const DEFAULT_ORDER_BY_COLUMN = 'id';
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

    selectQuery(params) {
        if (!params || !params.table) {
            return '';
        }
        let query = pgp.as.format('SELECT $<cols^> FROM $<tab#>', {
            cols: this.getColsQuery(params.columns),
            tab: params.table,
        });
        if (params.conditions) {
            let { logOp } = params;
            if (!logOp) {
                logOp = DEFAULT_LOG_OP;
            }
            query += pgp.as.format(' WHERE $<where^>', {
                where: this.getWhere(params.conditions, logOp),
            });
        }
        if (params.orderBy) {
            query += pgp.as.format(' ORDER BY $<col#>', {
                col: params.orderBy,
            });
            if (params.order) {
                query += pgp.as.format(' $<ord^>', {
                    ord: params.order,
                });
            }
        }
        if (params.limit) {
            query += pgp.as.format(' LIMIT $<lim#>', {
                lim: params.limit,
            });
        }
        if (params.offset) {
            query += pgp.as.format(' OFFSET $<off#>', {
                off: params.offset,
            });
        }
        return query;
    }

    insertQuery(table, data, retCol) {
        let query = pgp.helpers.insert(data, null, table);
        if (retCol) {
            query += pgp.as.format(' RETURNING $<col#>', { col: retCol });
        }
        return query;
    }

    updateQuery(table, data, conditions, logOp = DEFAULT_LOG_OP) {
        return pgp.as.format('$<update^> WHERE $<where^>', {
            update: pgp.helpers.update(data, null, table),
            where: this.getWhere(conditions, logOp),
        });
    }

    deleteQuery(table, conditions) {
        return this.updateQuery(table, { deleted: true }, conditions);
    }

    getWhere(conditions, logOp) {
        if (!conditions) {
            return '';
        }

        return pgp.helpers.sets(conditions).replace(new RegExp(',', 'g'), logOp);
    }

    getColsQuery(cols) {
        return (cols && cols.length) ? pgp.helpers.ColumnSet(cols).names : '*';
    }

    async countRegs(tab, cond) {
        return new Promise((resolve, reject) => {
            this.db.one(pgp.as.format('SELECT count(*) FROM ($<query^>) AS x', {
                query: this.selectQuery({
                    table: tab,
                    conditions: {
                        deleted: false,
                        ...cond,
                    },
                }),
            })).then(res => resolve(Number(res.count)))
                .catch(err => reject(err));
        });
    }

    async validatePage(table, page, cond = {}) {
        if (!page) {
            return Promise.resolve();
        }

        let regsNum = null;

        await this.countRegs(table, cond)
            .then((res) => { regsNum = res; })
            .catch(err => Promise.reject(err));

        if ((page - 1) * REG_PER_PAGE >= regsNum) {
            return Promise.reject(new Error('Page out of range'));
        }

        return Promise.resolve();
    }

    async exists(tab, cond) {
        return new Promise((resolve, reject) => {
            if (!tab) {
                reject(new Error('Table name is undefined'));
            }

            this.db.many(this.selectQuery({ table: tab, conditions: cond }))
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    async select(tab, cond, col, opr = DEFAULT_LOG_OP) {
        return new Promise((resolve, reject) => {
            this.db.many(this.selectQuery({
                table: tab,
                conditions: cond,
                columns: col,
                logOp: opr,
            }))
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    async selectNonDel(tab, cond, col, opr = DEFAULT_LOG_OP) {
        let conds = cond;
        if (!conds) {
            conds = { deleted: false };
        } else {
            conds.deleted = false;
        }

        return new Promise((resolve, reject) => {
            this.db.many(this.selectQuery({
                table: tab,
                conditions: conds,
                columns: col,
                logOp: opr,
            }))
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    async selectPaged(tab, cond, col, page = DEFAULT_PAGE, opr = DEFAULT_LOG_OP) {
        await this.validatePage(tab, page, cond).catch(err => Promise.reject(err));

        let conds = cond;
        if (!conds) {
            conds = { deleted: false };
        } else {
            conds.deleted = false;
        }

        return new Promise((resolve, reject) => {
            this.db.many(this.selectQuery({
                table: tab,
                conditions: conds,
                columns: col,
                logOp: opr,
                orderBy: DEFAULT_ORDER_BY_COLUMN,
                limit: REG_PER_PAGE,
                offset: (page - 1) * REG_PER_PAGE,
            }))
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    async selectLast(tab, cond, col, colOrd) {
        return new Promise((resolve, reject) => {
            this.db.one(this.selectQuery({
                table: tab,
                conditions: cond,
                columns: col,
                orderBy: colOrd,
                order: 'DESC',
                limit: 1,
            }))
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    async insert(table, data, retCol) {
        return new Promise((resolve, reject) => {
            this.db.one(this.insertQuery(table, data, retCol))
                .then(res => resolve(res[retCol]))
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
