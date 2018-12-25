var mysql = require("mysql");
//数据库连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'graduate',
    port: 3306
})
exports.pool = pool;