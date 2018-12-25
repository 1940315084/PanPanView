var mysql = require("mysql");
//数据库连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'panpan',
    port: 3306
})
exports.pool = pool;