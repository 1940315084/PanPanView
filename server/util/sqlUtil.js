var mysql = require("mysql");
//数据库连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'hejie197412',
    database: 'panpan',
    port: 3306
})
exports.pool = pool;