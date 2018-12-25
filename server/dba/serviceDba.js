const dbutil = require("../util/sqlUtil.js");
//主界面请求数据库获得服务表的数据
function getServiceData(first, max, cb) {
	dbutil.pool.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query("select id, servicename, servicecontent from service limit ?, ?", [first, max], function(err, serviceArray) {
			cb(serviceArray);
			connection.release();//释放连接到连接池，连接并没有并闭
		});
	});
}
//
//获得总条数
function showTotalPage(cb) {
	dbutil.pool.getConnection(function(err, connection) {
		if (err) {
			throw error;
		} else {
			const sql = 'select count(*) as totalCount from service';
			connection.query(sql, function(qerr, totalCountResult) {
				connection.release();//释放连接到连接池，连接并没有并闭
				cb(totalCountResult);
			});
		}
	});
}
//根据id删除服务信息
function deleteById(id, cb) {
	dbutil.pool.getConnection(function(err, connection) {
		if (err) {
			throw error;
		} else {
			const sql = 'delete from service where id=?';
			connection.query(sql, [id], function(qerr, result) {
				connection.release();//释放连接到连接池，连接并没有并闭
				cb(result.affectedRows);
			});
		}
	});
}
//修改部门
function changeService(id, servicename, servicecontent, cb) {
	dbutil.pool.getConnection(function(err, connection) {
		if (err) {
			throw error;
		} else {
			const sql = 'update service set servicename=?,servicecontent=? where id=?';
			connection.query(sql, [servicename, servicecontent, id], function(qerr, result) {
				connection.release();//释放连接到连接池，连接并没有并闭
				cb(result.affectedRows);
			});
		}
	});
}
exports.changeService = changeService;
exports.deleteById = deleteById;
exports.showTotalPage = showTotalPage;
exports.getServiceData = getServiceData;