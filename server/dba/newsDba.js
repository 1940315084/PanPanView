const sqlutil = require("../util/sqlUtil.js");

//分页查询    
function selectByLimit(first, max, cb) {
    sqlutil.pool.getConnection(function (err, connection) {
        if (err) {
            throw error;
        } else {
            const sql = 'select id,title,content,variety,image_url from news where variety =1 order by id limit ?, ?';
            connection.query(sql, [first, max], function (qerr, newsArray) {
                connection.release();//释放连接到连接池，连接并没有并闭
                cb(newsArray);
            });
        }
    });
}


//查出总条数
function selectTotalResult(cb) {
    sqlutil.pool.getConnection(function (err, connection) {
        if (err) {
            throw error;
        } else {
            const sql = "select count(*) as totalResult from news where variety = 1";
            connection.query(sql, [], function (qerr, totalResultArray) {
                connection.release();
                cb(totalResultArray);
            });
        }
    });
}


//分页查询2
function selectByLimit2(first2, max, cb) {
    sqlutil.pool.getConnection(function (err, connection) {
        if (err) {
            throw error;
        } else {
            const sql = 'select id,title,content,variety,image_url from news where variety =2 order by id limit ?, ?';
            connection.query(sql, [first2, max], function (qerr, newsArray2) {
                console.log("newsArray2===========", newsArray2)
                connection.release();//释放连接到连接池，连接并没有并闭
                cb(newsArray2);
            });
        }
    });
}


//查出总条数2
function selectTotalResult2(cb) {
    sqlutil.pool.getConnection(function (err, connection) {
        if (err) {
            throw error;
        } else {
            const sql = "select count(*) as totalResult2 from news where variety = 2";
            connection.query(sql, [], function (qerr, totalResultArray2) {
                connection.release();
                cb(totalResultArray2);
            });
        }
    });
}


//根据id删除部门
function deleteById(id, cb) {
    sqlutil.pool.getConnection(function (err, connection) {
        if (err) {
            throw error;
        } else {
            const sql = 'delete from news where id = ?';
            connection.query(sql, [id], function (qerr, result) {
                connection.release();
                var affectedRows = result.affectedRows;//删除条数
                cb(affectedRows);
            });
        }
    });
}


//增加新闻
function insert(title, content, variety, image_url, cb) {
    sqlutil.pool.getConnection(function (err, connection) {
        if (err) {
            throw error;
        } else {
            const sql = 'insert into news(title,content,variety,image_url)values(?,?,?,?)';
            connection.query(sql, [title, content, variety, image_url], function (qerr, result) {
                connection.release();
                console.log("result--------", result, qerr)
                cb(result);
            });
        }
    });
}


exports.insert = insert;
exports.deleteById = deleteById;
exports.selectByLimit = selectByLimit;
exports.selectTotalResult = selectTotalResult;
exports.selectByLimit2 = selectByLimit2;
exports.selectTotalResult2 = selectTotalResult2;
