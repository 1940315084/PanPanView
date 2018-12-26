//用户  分页查询
const sqlUtil = require("../util/sqlUtil.js");
function selectByLimit(first, max, cb) {
    sqlUtil.pool.getConnection(function(err, connection) {
        if (err) {
            throw error;
        } else {
            const sql = 'select * from user limit ?, ?';
            connection.query(sql, [first, max], function(qerr, userArray) {
                connection.release();//释放连接到连接池，连接并没有并闭
				cb(userArray);
            });
        }
    });
}
//查出总条数
function selectTotlResult(cb) {
    sqlUtil.pool.getConnection(function(err, connection) {
        if (err) {
            throw error;
        } else {
            const sql = 'select count(*) as totalResult from user';
            connection.query(sql, [], function(qerr, totalResultArray) {
                connection.release();//"[{totalResult:4}]"
                cb(totalResultArray);
            });
        }
    });
}

//修改订单状态
function updateOrder(id,  remark, cb) {
	sqlUtil.pool.getConnection(function(err, connection) {
		if (err) {
			throw error;
		} else {
			const sql = 'update user set remark=? where id=?';
			connection.query(sql, [remark, id], function(qerr, result) {
				connection.release();//"[{totalResult:11}]"
				//删除了多少条
				var affectedRows = result.affectedRows;
				cb(affectedRows);
			});
		}
	});
}

//检查该条记录是否符合这一备注是否存在
function checkReExits(id, remark, cb) {
	sqlUtil.pool.getConnection(function(err, connection) {
		if (err) {
			throw error;
		} else {
			const sql = 'select count(*) as num from user where remark=? and id =?';
			connection.query(sql, [remark, id], function(qerr, result) {
				connection.release();
				cb(result);//"[{num:1}]"表示有这一订单状态  如果是0  就表示没有
			});
		}
	});
}
exports.selectByLimit = selectByLimit;
exports.selectTotlResult = selectTotlResult;
exports.updateOrder = updateOrder;
exports.checkReExits = checkReExits;